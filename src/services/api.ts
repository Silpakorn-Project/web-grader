import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

export interface TestCase {
    input: string;
    expected_output: string;
}

export interface SubmitCodeRequest {
    source_code: string;
    test_cases: TestCase[];
}

export interface TestCaseResponse {
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    error: string;
}

export interface SubmitCodeResponse {
    passed: boolean;
    testcase_total: number;
    testcase_passed: number;
    testcase_wrong: number;
    test_cases: TestCaseResponse[];
}

export const submitCode = async (
    submitCodeRequest: SubmitCodeRequest
): Promise<SubmitCodeResponse> => {
    const response = await API.post("/submit", submitCodeRequest);

    return response.data;
};
