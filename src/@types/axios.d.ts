import "axios";

declare module "axios" {
    interface AxiosRequestConfig {
        __isRetryRequest?: boolean;
    }
}
