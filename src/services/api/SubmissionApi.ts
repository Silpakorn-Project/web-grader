import { BaseApi } from "../BaseApi";
import { ISubmitRequest } from "../models/GraderServiceModel";

export class SubmissionApi extends BaseApi{
    public async submit(submitRequest: ISubmitRequest) {
        return await this.httpClient.post<ISubmitRequest>("/api/submission/submit", submitRequest);
    }
}