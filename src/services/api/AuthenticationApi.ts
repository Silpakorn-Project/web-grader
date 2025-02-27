import { BaseApi } from "../BaseApi";
import { BaseResponse } from "../models/BaseResponse";
import {
    ILoginRequest,
    ILoginResponse,
    IRegisterRequest,
} from "../models/GraderServiceModel";

export class AuthenticationApi extends BaseApi {
    public async login(loginRequest: ILoginRequest) {
        const response = await this.httpClient.post<
            ILoginRequest,
            BaseResponse<ILoginResponse>
        >("/api/auth/login", loginRequest);
        return response.data;
    }

    public async logout() {
        await this.httpClient.post("/api/auth/logout");
    }

    public async register(registerRequest: IRegisterRequest) {
        const response = await this.httpClient.post<IRegisterRequest>(
            "/api/auth/register",
            registerRequest
        );
        return response.data;
    }

    public async refreshToken() {
        const response = await this.httpClient.post<
            ILoginRequest,
            BaseResponse<ILoginResponse>
        >("/api/auth/refresh");
        return response.data;
    }
}
