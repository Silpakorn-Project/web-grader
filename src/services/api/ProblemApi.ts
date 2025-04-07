import { BaseApi } from "../BaseApi";
import { BasePaginationResponse, BaseResponse } from "../models/BaseResponse";
import {
    IProblemRequest,
    IProblemResponse,
    IProblemsQueryParams,
} from "../models/GraderServiceModel";

export class ProblemApi extends BaseApi {
    public async getProblems(queryParams?: IProblemsQueryParams) {
        const response = await this.httpClient.get<
            BasePaginationResponse<IProblemResponse>
        >("/api/problems", { params: queryParams });
        return response.data;
    }

    public async getProblemById(id: number) {
        const response = await this.httpClient.get<
            BaseResponse<IProblemResponse>
        >(`/api/problems/${id}`);
        return response.data;
    }

    public async createProblem(problemRequest: IProblemRequest) {
        const response = await this.httpClient.post<IProblemRequest, BaseResponse<number>>(
            "/api/problems",
            problemRequest
        );
        return response.data;
    }
}
