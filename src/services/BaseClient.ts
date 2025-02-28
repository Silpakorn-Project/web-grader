import { AxiosRequestConfig } from "axios";
import { IHttpClientInterceptors } from "./http/@types/HttpClients";
import HttpClient from "./http/HttpClient";

export abstract class BaseClient {
    protected httpClient: HttpClient;

    constructor(
        config?: AxiosRequestConfig,
        interceptors?: IHttpClientInterceptors
    ) {
        this.httpClient = HttpClient.create(config, interceptors);
    }
}
