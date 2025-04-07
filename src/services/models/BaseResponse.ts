export interface BaseResponse<T> {
    timestamp: string;
    message: string;
    code: number;
    data: T;
}

export interface BasePaginationResponse<T> {
    timestamp: string;
    message: string;
    code: number;
    data: T[];
    totalPages: number;
    totalRecords: number;
    dataCount: number;
}
