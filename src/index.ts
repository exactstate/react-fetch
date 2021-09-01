import { 
    IApiConfig, 
    IApiWrapper, 
    CorsOption, 
    Method, 
    CredentialsOption 
} from "./types";

import { objectToQueryString } from './utils';

class ApiWrapper implements IApiWrapper {
    config: IApiConfig;

    constructor(config?: IApiConfig) {
        this.config = {
            baseURL: '',
            headers: () => [['Content-Type', 'application/json']],
            cors: CorsOption.Cors,
            credentials: CredentialsOption.Omit,
            returnBody: true,
            verbose: false,
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
        let query = method === Method.Get ? objectToQueryString(data) : '';
        this.load(true);

        return new Promise(async (resolve, reject) => {
            return fetch(this.config.baseURL + url + query, {
                headers: this.config.headers && this.config.headers(),
                method,
                mode: this.config.cors,
                credentials: this.config.credentials,
                body: (method !== Method.Get) ? JSON.stringify(data) : undefined
            })
                .then((res: Response) => {
                    let json = res.json();
                    this.log(url, method, json);
                    let resolution = (res.status >= 200 || res.status <= 299) ? resolve : reject;
                    resolution(this.config.returnBody ? json : res);
                })
                .catch((err) => {
                    err.network = true;
                    reject(err);
                })
                .finally(() => {
                    this.load(false);
                });
        });
    }

    // GET
    get(url: string, query?: any) { 
        this.request(url, Method.Get, query); 
    }

    // POST
    post(url: string, data?: any) {
        return this.request(url, Method.Post, data);
    }

    // PUT
    put(url: string, data?: any) {
        return this.request(url, Method.Put, data);
    }

    // PATCH
    patch(url: string, data?: any) {
        return this.request(url, Method.Patch, data);
    }

    // DELETE
    delete(url: string, data?: any) {
        return this.request(url, Method.Delete, data);
    }

    // OPTIONS
    options(url: string) {
        return this.request(url, Method.Options);
    }

    // Updates loading state if passed in constructor
    load(status: boolean) {
        if (this.config.loadingState && this.config.loadingState[1])
            this.config.loadingState[1](status);
    }

    // Logs a message
    log(url: string, method: Method, responseBody: Promise<object>) {
        if (!this.config.verbose) return;

        responseBody.then(data => {
            console.info(`%c${this.config.baseURL} ${url} (${method.toUpperCase()}): `, 'font-size: 1.5em;');
            console.info(data);
        });
    }
}

if (window) (<any>window).ApiWrapper = ApiWrapper;
export default ApiWrapper;