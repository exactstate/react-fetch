"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class ApiWrapper {
    constructor(config) {
        this.config = Object.assign({ baseURL: '', headers: () => [['Content-Type', 'application/json']], cors: types_1.CorsOption.Cors, credentials: types_1.CredentialsOption.Omit }, config);
    }
    /**
     * Creates a fetch request
     * @param url Endpoint
     * @param method Method Type
     * @param data Request body
     */
    request(url, method, data) {
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
exports.default = ApiWrapper;
