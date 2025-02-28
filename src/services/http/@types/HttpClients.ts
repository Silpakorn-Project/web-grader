import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface IAxiosResponse<T> extends AxiosResponse {
    data: T;
}

export interface IInnerInterceptor {
    request?: IRequestInterceptor;
    response?: IResponseInterceptor;
}

export interface IHttpClientInterceptors {
    requestInterceptor?: IRequestInterceptor;
    responseInterceptor?: IResponseInterceptor;
}

export interface IRequestInterceptor {
    onSuccess?: onInterceptorSuccess<InternalAxiosRequestConfig>;
    onError?: onInterceptorError;
}

export interface IResponseInterceptor {
    onSuccess?: onInterceptorSuccess<AxiosResponse>;
    onError?: onInterceptorError;
}

export type onInterceptorSuccess<V> = (value: V) => V | Promise<V>;
export type onInterceptorError = (error: any) => any;
