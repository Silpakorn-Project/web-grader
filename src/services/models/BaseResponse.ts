export interface BaseResponse<T> {
    timestamp: string;
    message: string;
    code: number;
    data: T;
}