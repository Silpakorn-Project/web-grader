import { BaseApi } from "../BaseApi";
import { ISubmitRequest } from "../models/GraderServiceModel";

export class SubmissionApi extends BaseApi {
    public async submit(submitRequest: ISubmitRequest) {
        console.log(this.httpClient._interceptors);
        return await this.httpClient.post<ISubmitRequest>(
            "/api/submissions/submit",
            submitRequest
        );
    }
}
