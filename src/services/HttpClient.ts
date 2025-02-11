import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

class HttpClient {
    private _axios: AxiosInstance;
    private _axiosConfig: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    constructor(config: AxiosRequestConfig = {}) {
        this._axiosConfig = { ...this._axiosConfig, ...config };
        this._axios = axios.create(this._axiosConfig);

        this._axios.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
        this._axios.interceptors.request.use(this.handleSuccessRequest);
    }

    private handleSuccessResponse(response: AxiosResponse): AxiosResponse {
        return response;
    }

    private handleErrorResponse(error: any): Promise<never> {
        throw error;
    }

    private handleSuccessRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        return config;
    }

    public static create(httpConfig?: AxiosRequestConfig) {
        return new HttpClient(httpConfig);
    }

    public get instance() {
        return this._axios;
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this._axios.get(url, config);
    }

    public async post<D = any, T = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this._axios.post(url, data, config);
    }

    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this._axios.put(url, data, config);
    }

    public async patch<D = any, T = any>(
        url: string,
        data?: D,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this._axios.patch(url, data, config);
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this._axios.delete(url, config);
    }

    public async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this._axios.head(url, config);
    }
}

export default HttpClient;