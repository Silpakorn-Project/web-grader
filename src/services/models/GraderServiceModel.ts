export interface ISubmitRequest {
    userId: number;
    problemId: number;
    code: String;
    language: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface ILoginResponse {
    username: string;
    token: string;
}

export interface IRegisterRequest {
    username: string;
    password: string;
    email: string;
}
