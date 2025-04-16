import { BaseApi } from "../BaseApi";
import { BasePaginationResponse, BaseResponse } from "../models/BaseResponse";
import { ILeaderboardResponse } from "../models/GraderServiceModel";

export class LeaderboardApi extends BaseApi {
    public async getLeaderboard(
        offset: number,
        limit: number,
        filteredUserId?: number
    ) {
        const response = await this.httpClient.get<BasePaginationResponse<ILeaderboardResponse>>(
            "/api/leaderboard",
            {
                params: { offset, limit, filteredUserId },
            }
        );
        return response.data;
    }

    public async getUserRanking(userId: number) {
        const response = await this.httpClient.get<BaseResponse<ILeaderboardResponse>>(
            `/api/leaderboard/${userId}`
        );
        return response.data;
    }
}
