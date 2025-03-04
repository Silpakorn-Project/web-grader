import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import {
    ITestCaseResponse,
    ITestCasesQueryParams,
} from "../models/GraderServiceModel";

export class TestCaseApi extends BaseApi {
    public async getTestCases(queryParams?: ITestCasesQueryParams) {
        const response = await this.httpClient.get<
            BaseResponse<ITestCaseResponse[]>
        >("/api/testcases", { params: queryParams });
        return response.data;
    }
}
