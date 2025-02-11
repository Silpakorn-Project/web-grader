import { BaseApi } from "../BaseApi";

export class ProblemApi extends BaseApi {
    public async getProblems() {
        const response = await this.httpClient.get("/api/problems");
        return response.data;
    }
}
