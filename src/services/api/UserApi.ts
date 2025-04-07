import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import { IUserResponse } from "../models/GraderServiceModel";

export class UserApi extends BaseApi {
    public async getUsers() {
        const response = await this.httpClient.get<
            BaseResponse<IUserResponse[]>
        >("/api/users");
        return response.data;
    }
}
