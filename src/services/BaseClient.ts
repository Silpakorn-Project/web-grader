import { AxiosRequestConfig } from "axios";
import HttpClient from "./http/HttpClient";

export abstract class BaseClient {
    protected httpClient: HttpClient;

    constructor(config?: AxiosRequestConfig) {
        this.httpClient = HttpClient.create(config);
    }
}