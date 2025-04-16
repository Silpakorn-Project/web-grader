import { BaseApi } from "../BaseApi";
import { BasePaginationResponse } from "../models/BaseResponse";
import {
    ITestCaseRequset,
    ITestCaseResponse,
    ITestCasesQueryParams,
} from "../models/GraderServiceModel";

export class TestCaseApi extends BaseApi {
    public async getTestCases(queryParams?: ITestCasesQueryParams) {
        const response = await this.httpClient.get<
            BasePaginationResponse<ITestCaseResponse>
        >("/api/testcases", { params: queryParams });
        return response.data;
    }

    public async createTestcases(testCases: ITestCaseRequset) {
        await this.httpClient.post("/api/testcases", testCases);
    }
}
