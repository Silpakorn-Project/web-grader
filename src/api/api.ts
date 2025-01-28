import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export interface TestCase {
    input: string;
    expected_output: string;
}
//test
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
