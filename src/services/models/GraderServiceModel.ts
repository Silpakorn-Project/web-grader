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

export interface IProblemResponse {
    problemId: number;
    title: string;
    description: string;
    difficulty: string;
    type: string;
}

export interface ITestCaseResponse {
    testcaseId: number;
    problemId: number;
    inputData: string;
    expectedOutput: string;
}

export interface ITestCasesQueryParams {
    problemId?: number;
}
