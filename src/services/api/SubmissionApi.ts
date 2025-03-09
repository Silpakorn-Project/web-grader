import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import {
    ISubmissionResponse,
    ISubmissionsQueryParams,
    ISubmitRequest,
    ISubmitResponse,
} from "../models/GraderServiceModel";

export class SubmissionApi extends BaseApi {
    public async submit(submitRequest: ISubmitRequest) {
        const response = await this.httpClient.post<
            ISubmitRequest,
            BaseResponse<ISubmitResponse>
        >("/api/submissions/submit", submitRequest);
        return response.data;
    }

    public async getSubmissions(queryParams: ISubmissionsQueryParams) {
        const response = await this.httpClient.get<
            BaseResponse<ISubmissionResponse[]>
        >("/api/submissions", { params: queryParams });
        return response.data;
    }
}
