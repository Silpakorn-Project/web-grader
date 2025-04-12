import { PaginationQueryParams } from "./PaginationQueryParams";

export interface ITestResultResponse {
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    error: string;
}

export interface ISubmitRequest {
    userId: number;
    problemId: number;
    code: String;
    language: string;
}

export interface ISubmitResponse {
    passed: boolean;
    testcase_total: number;
    testcase_passed: number;
    testcase_wrong: number;
    test_cases: ITestResultResponse[];
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IUserTokenResponse {
    userId: number;
    username: string;
    email: string;
    token: string;
    role: string;
}

export interface IRegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface IProblemRequest {
    title: string;
    description: string;
    difficulty: string;
    type: string;
}

export interface IProblemResponse {
    problemId: number;
    title: string;
    description: string;
    difficulty: string;
    type: string;
}

export interface IProblemsQueryParams extends PaginationQueryParams {
    title?: string;
    description?: string;
    difficulty?: string;
    type?: string;
}

export interface ITestCaseRequset {
    problemId: number;
    testcases: { inputData: string; expectedOutput: string }[];
}

export interface ITestCaseResponse {
    testcaseId: number;
    problemId: number;
    inputData: string;
    expectedOutput: string;
}

export interface ITestCasesQueryParams extends PaginationQueryParams {
    problemId?: number;
}

export interface ISubmissionResponse {
    submissionId: number;
    userId: number;
    problemId: number;
    code: string;
    language: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISubmissionsQueryParams extends PaginationQueryParams {
    userId?: number;
    problemId?: number;
    language?: string;
    status?: string;
}

export interface IUserResponse {
    id: number;
    username: string;
    email: string;
    score: number;
}

export interface ILeaderboardRequest {
    offset: number;
    limit: number;
    filteredUserIds: number;
}

export interface ILeaderboardResponse {
    id: number;
    username: string;
    score: number;
    rank: number;
}
