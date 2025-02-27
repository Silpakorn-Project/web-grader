import { AuthenticationApi } from "../api/AuthenticationApi";
import { ProblemApi } from "../api/ProblemApi";
import { SubmissionApi } from "../api/SubmissionApi";
import { TestCaseApi } from "../api/TestCaseApi";
import { BaseClient } from "../BaseClient";
import { withMutation, WithMutationApi } from "../utils/withMutation";

export class GraderServiceClient extends BaseClient {
    public submission: WithMutationApi<SubmissionApi>;
    public authentication: WithMutationApi<AuthenticationApi>;
    public problems: WithMutationApi<ProblemApi>;
    public testCase: WithMutationApi<TestCaseApi>;

    constructor(baseURL: string) {
        super({
            baseURL: baseURL,
            withCredentials: true,
        });

        this.submission = withMutation(new SubmissionApi(this.httpClient));
        this.authentication = withMutation(
            new AuthenticationApi(this.httpClient)
        );
        this.problems = withMutation(new ProblemApi(this.httpClient));
        this.testCase = withMutation(new TestCaseApi(this.httpClient));
    }
}
