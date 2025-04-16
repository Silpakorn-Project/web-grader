import { BaseApi } from "../BaseApi";
import { BasePaginationResponse, BaseResponse } from "../models/BaseResponse";
import { IUserResponse } from "../models/GraderServiceModel";
import { PaginationQueryParams } from "../models/PaginationQueryParams";

export class UserApi extends BaseApi {
    public async getUsers(params: PaginationQueryParams) {
        const response = await this.httpClient.get<
            BasePaginationResponse<IUserResponse>
        >("/api/users", {params: params});
        return response.data;
    }

    public async getUserById(id: number) {
        const response = await this.httpClient.get<BaseResponse<IUserResponse>>(
            `/api/users/${id}`
        );
        return response.data;
    }
}
