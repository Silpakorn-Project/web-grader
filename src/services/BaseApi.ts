import HttpClient from "./http/HttpClient";

export class BaseApi {
    protected httpClient: HttpClient;

    constructor(_httpClient: HttpClient) {
        this.httpClient = _httpClient;
    }
}
