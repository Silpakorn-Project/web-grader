import router from "@/rounter/rounter";
import { useAuthStore } from "@/store/AuthStore";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

class HttpClient {
    private _axios: AxiosInstance;
    private _axiosConfig: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    constructor(config: AxiosRequestConfig = {}) {
        this._axiosConfig = { ...this._axiosConfig, ...config };
        this._axios = axios.create(this._axiosConfig);

        this._axios.interceptors.request.use(
            this.defaultRequestInterceptor().onSuccess,
            this.defaultRequestInterceptor().onError
        );

        this._axios.interceptors.response.use(
            this.defaultResponseInterceptor().onSucces,
            this.defaultResponseInterceptor().onError
        );
    }

    private defaultRequestInterceptor() {
        return {
            onSuccess: (config: InternalAxiosRequestConfig) => {
                const token = useAuthStore.getState().token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },

            onError: (error: AxiosError) => {
                return Promise.reject(error);
            },
        };
    }

    private defaultResponseInterceptor() {
        return {
            onSucces: (response: AxiosResponse) => {
                return response;
            },
            onError: (error: AxiosError) => {
                if (error.response?.status === 401) {
                    router.navigate("/login");
                }

                return Promise.reject(error);
            },
        };
    }

    public static create(httpConfig?: AxiosRequestConfig) {
        return new HttpClient(httpConfig);
    }

    public get instance() {
        return this._axios;
    }

    public async get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.get(url, config);
    }

    public async post<D = any, T = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.post(url, data, config);
    }

    public async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.put(url, data, config);
    }

    public async patch<D = any, T = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.patch(url, data, config);
    }

    public async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.delete(url, config);
    }

    public async head<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this._axios.head(url, config);
    }
}

export default HttpClient;
