import { BaseApi } from "../BaseApi";
import { BasePaginationResponse } from "../models/BaseResponse";
import {
    ITestCaseResponse,
    ITestCasesQueryParams,
    ITestCasesRequset,
    ITestCaseUpdateRequest,
} from "../models/GraderServiceModel";

export class TestCaseApi extends BaseApi {
    public async getTestCases(queryParams?: ITestCasesQueryParams) {
        const response = await this.httpClient.get<
            BasePaginationResponse<ITestCaseResponse>
        >("/api/testcases", { params: queryParams });
        return response.data;
    }

    public async createTestcases(testCases: ITestCasesRequset) {
        await this.httpClient.post("/api/testcases", testCases);
    }

    public async updateTestcase(
        testCase: ITestCaseUpdateRequest,
        testCaseId: number
    ) {
        await this.httpClient.put<ITestCaseUpdateRequest>(
            `/api/testcases/${testCaseId}`,
            testCase
        );
    }

    public async deleteTestcase(testCaseId: number) {
        await this.httpClient.delete(`/api/testcases/${testCaseId}`);
    }
}
