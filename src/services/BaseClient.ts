import { AxiosRequestConfig } from "axios";
import HttpClient from "./HttpClient";

export abstract class BaseClient {
    protected httpClient: HttpClient;

    constructor(config?: AxiosRequestConfig) {
        this.httpClient = HttpClient.create(config);
    }
}