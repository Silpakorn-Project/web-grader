import { router } from "@/rounter/rounter";
import { useAuthStore } from "@/store/AuthStore";
import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import { client } from "..";
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
        super(
            {
                baseURL: baseURL,
                withCredentials: true,
            },
            {
                requestInterceptor,
                responseInterceptor,
            }
        );

        this.submission = withMutation(new SubmissionApi(this.httpClient));
        this.authentication = withMutation(
            new AuthenticationApi(this.httpClient)
        );
        this.problems = withMutation(new ProblemApi(this.httpClient));
        this.testCase = withMutation(new TestCaseApi(this.httpClient));
    }
}

const requestInterceptor = {
    onSuccess: (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    onError: (error: AxiosError) => Promise.reject(error),
};

const responseInterceptor = {
    onSuccess: (response: AxiosResponse) => response,
    onError: async (error: AxiosError) => {
        if (error.response?.status === 401) {
            const config = error.config;

            if (config && !config.__isRetryRequest) {
                const authStore = useAuthStore.getState();

                try {
                    config.__isRetryRequest = true;

                    authStore.clearCredentials();
                    const response =
                        await client.graderService.authentication.refreshToken();
                    authStore.setCredential(response.data);

                    config.headers[
                        "Authorization"
                    ] = `Bearer ${response.data.token}`;

                    return await axios.request(config);
                } catch (e) {
                    authStore.clearCredentials();
                    router.navigate("/login");
                }
            }
        }

        return Promise.reject(error);
    },
};
