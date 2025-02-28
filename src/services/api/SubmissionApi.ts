import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import { ISubmitRequest, ISubmitResponse } from "../models/GraderServiceModel";

export class SubmissionApi extends BaseApi {
    public async submit(submitRequest: ISubmitRequest) {
        const response = await this.httpClient.post<
            ISubmitRequest,
            BaseResponse<ISubmitResponse>
        >("/api/submissions/submit", submitRequest);
        return response.data;
    }
}
