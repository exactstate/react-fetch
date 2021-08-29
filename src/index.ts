import { IApiConfig, IApiWrapper, CorsOption, Method, CredentialsOption } from "./types";

export default class ApiWrapper implements IApiWrapper {
    config: IApiConfig;

    constructor(config?: IApiConfig) {
        this.config = {
            baseURL: '',
            headers: () => [['Content-Type', 'application/json']],
            cors: CorsOption.Cors,
            credentials: CredentialsOption.Omit,
            ...config
        }
    }

    /**
     * Creates a fetch request
     * @param url Endpoint
     * @param method Method Type
     * @param data Request body
     */
    request(url: string, method: Method, data: any) {
        return new Promise((resolve, reject) => {

            fetch(this.config.baseURL + url, {
                headers: this.config.headers(),
                method,
                mode: this.config.cors,
                credentials: this.config.credentials
            }).then(res => {

            });
        });
    }
}