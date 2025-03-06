import { client } from "@/services";
import { ITestCaseResponse } from "@/services/models/GraderServiceModel";
import { useWorkspaceStore } from "@/store/WorkspaceStore";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Box, Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import TestCaseDetail from "./TestCaseDetail";
import TestResults from "./TestResults";

type TestCaseProps = {};

const TestCase: FC<TestCaseProps> = () => {
    const { isSubmitting, submitResponse, currentView, setCurrentView } =
        useWorkspaceStore();
    const { id: problemId } = useParams();

    const [selectedTestCase, setSelectedTestCase] =
        useState<ITestCaseResponse | null>(null);

    const { data: testCases } = useQuery({
        queryKey: ["testcases", problemId],
        queryFn: async () => {
            const response = await client.graderService.testCase.getTestCases({
                problemId: Number(problemId),
            });
            return response.data;
        },
    });

    useEffect(() => {
        if (testCases && testCases.length > 0) {
            setSelectedTestCase(testCases[0]);
        }
    }, [testCases]);

    return (
        <WorkspaceBox>
            <WorkspaceBoxTopBar>
                <Button
                    color="inherit"
                    variant="text"
                    startIcon={<DomainVerificationIcon color="success" />}
                    size="small"
                    onClick={() => setCurrentView("test_case")}
                    sx={{
                        opacity: currentView === "test_case" ? 1 : 0.5,
                    }}
                >
                    Testcase
                </Button>

                <Button
                    color="inherit"
                    variant="text"
                    startIcon={<TerminalIcon color="success" />}
                    size="small"
                    onClick={() => setCurrentView("test_result")}
                    loading={isSubmitting}
                    loadingPosition="start"
                    sx={{
                        opacity: currentView === "test_result" ? 1 : 0.5,
                    }}
                >
                    Test Result
                </Button>
            </WorkspaceBoxTopBar>

            {testCases && selectedTestCase && (
                <Box
                    sx={{
                        overflowY: "auto",
                        height: "calc(100% - 40px)",
                    }}
                >
                    {currentView === "test_case" && (
                        <Stack direction="column" spacing={2} p={2}>
                            <Stack direction="row" spacing={2}>
                                {testCases.map((testCase, index) => (
                                    <Button
                                        key={index}
                                        color="inherit"
                                        variant={
                                            selectedTestCase.testcaseId ===
                                            testCase.testcaseId
                                                ? "contained"
                                                : "text"
                                        }
                                        onClick={() =>
                                            setSelectedTestCase(testCase)
                                        }
                                    >
                                        Case {index + 1}
                                    </Button>
                                ))}
                            </Stack>
                            <Stack spacing={2}>
                                <TestCaseDetail
                                    label="Input"
                                    content={selectedTestCase.inputData}
                                />
                                <TestCaseDetail
                                    label="Output"
                                    content={selectedTestCase.expectedOutput}
                                />
                            </Stack>
                        </Stack>
                    )}

                    {currentView === "test_result" && (
                        <TestResults
                            response={submitResponse}
                            loading={isSubmitting}
                        />
                    )}
                </Box>
            )}
        </WorkspaceBox>
    );
};

export default TestCase;
