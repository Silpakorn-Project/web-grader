import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import {
    IHttpClientInterceptors,
    IInnerInterceptor,
} from "./@types/HttpClients";

class HttpClient {
    private _axios: AxiosInstance;
    private _axiosConfig: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    public _interceptors: IInnerInterceptor = {};

    constructor(
        config?: AxiosRequestConfig,
        interceptors?: IHttpClientInterceptors
    ) {
        this._axiosConfig = { ...this._axiosConfig, ...config };
        this._axios = axios.create(this._axiosConfig);
        this.registerInterceptor(
            interceptors?.requestInterceptor,
            interceptors?.responseInterceptor
        );
    }

    public registerInterceptor(
        request?: IHttpClientInterceptors["requestInterceptor"],
        response?: IHttpClientInterceptors["responseInterceptor"]
    ) {
        this._axios.interceptors.request.use(
            request?.onSuccess || this.defaultRequestInterceptor().onSuccess,
            request?.onError || this.defaultRequestInterceptor().onError
        );

        this._axios.interceptors.response.use(
            response?.onSuccess || this.defaultResponseInterceptor().onSuccess,
            response?.onError || this.defaultResponseInterceptor().onError
        );

        this._interceptors = {
            request: request,
            response: response,
        };
    }

    private defaultRequestInterceptor() {
        return {
            onSuccess: (config: InternalAxiosRequestConfig) => {
                return config;
            },

            onError: (error: AxiosError) => {
                return Promise.reject(error);
            },
        };
    }

    private defaultResponseInterceptor() {
        return {
            onSuccess: (response: AxiosResponse) => {
                return response;
            },
            onError: (error: AxiosError) => {
                return Promise.reject(error);
            },
        };
    }

    public static create(
        httpConfig?: AxiosRequestConfig,
        interceptors?: IHttpClientInterceptors
    ) {
        return new HttpClient(httpConfig, interceptors);
    }

    public get instance() {
        return this._axios;
    }

    public disabledDefaultRequestInterceptor() {
        return new HttpClient(this._axiosConfig, {
            responseInterceptor: this._interceptors.response,
        });
    }

    public disabledDefaultResponseInterceptor() {
        return new HttpClient(this._axiosConfig, {
            requestInterceptor: this._interceptors.request,
        });
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
