import { AuthenticationApi } from "../api/AuthenticationApi";
import { ProblemApi } from "../api/ProblemApi";
import { SubmissionApi } from "../api/SubmissionApi";
import { BaseClient } from "../BaseClient";

export class GraderServiceClient extends BaseClient {
    public submission: SubmissionApi;
    public authentication: AuthenticationApi;
    public problems: ProblemApi;

    constructor(baseURL: string) {
        super({
            baseURL: baseURL,
        });

        this.submission = new SubmissionApi(this.httpClient);
        this.authentication = new AuthenticationApi(this.httpClient);
        this.problems = new ProblemApi(this.httpClient);
    }
}