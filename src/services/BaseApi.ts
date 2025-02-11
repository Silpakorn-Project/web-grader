import HttpClient from "./HttpClient";

export class BaseApi {
    protected httpClient: HttpClient;

    constructor(_httpClient: HttpClient) {
        this.httpClient = _httpClient;
    }
}
