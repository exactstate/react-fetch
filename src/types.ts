export interface IApiConfig {
    baseURL: string,
    headers?: Function,
    credentials?: CredentialsOption,
    cors?: CorsOption,
    returnBody?: boolean
}

export interface IApiWrapper {
    config: IApiConfig,
    request(url: string, method: Method, data: any): void
}

export enum Method {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete ='delete',
    Patch = 'patch',
    Options = 'options'
}

export enum CorsOption {
    SameOrigin = 'same-origin',
    Cors = 'cors',
    NoCors = 'no-cors'
}

export enum CredentialsOption {
    Omit = 'omit',
    SameOrigin ='same-origin',
    Include = 'include'
}