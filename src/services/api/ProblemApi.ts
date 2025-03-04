import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import { IProblemResponse } from "../models/GraderServiceModel";

export class ProblemApi extends BaseApi {
    public async getProblems() {
        const response = await this.httpClient.get<
            BaseResponse<IProblemResponse[]>
        >("/api/problems");
        return response.data;
    }

    public async getProblemById(id: number) {
        const response = await this.httpClient.get<
            BaseResponse<IProblemResponse>
        >(`/api/problems/${id}`);
        return response.data;
    }
}
