import { 
    IApiConfig, 
    IApiWrapper, 
    CorsOption, 
    Method, 
    CredentialsOption 
} from "./types";

class ApiWrapper implements IApiWrapper {
    config: IApiConfig;

    constructor(config?: IApiConfig) {
        this.config = {
            baseURL: '',
            headers: () => [['Content-Type', 'application/json']],
            cors: CorsOption.Cors,
            credentials: CredentialsOption.Omit,
            returnBody: true,
            ...config
        }
    }

    /**
     * Creates a fetch request
     * @param url Endpoint
     * @param method Method Type
     * @param data Request body
     */
    request(url: string, method: Method, data?: any) {
        return new Promise(async (resolve, reject) => {
            return fetch(this.config.baseURL + url, {
                headers: this.config.headers && this.config.headers(),
                method,
                mode: this.config.cors,
                credentials: this.config.credentials,
                body: (method !== Method.Get) ? data : undefined
            })
                .then((res: Response) => {
                    let resolution = (res.status >= 200 || res.status <= 299) ? resolve : reject;
                    resolution(this.config.returnBody ? res.json() : res);
                });
        });
    }

    get(url: string, query: any) {
        this.request(url, Method.Get, query)
    }
}

if (window) (<any>window).ApiWrapper = ApiWrapper;
export default ApiWrapper;