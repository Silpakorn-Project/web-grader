import { CodeEditorRef } from "@/components/CodeEditor/CodeEditor";
import { client } from "@/services";
import { ITestCaseResponse } from "@/services/models/GraderServiceModel";
import { useAuthStore } from "@/store/AuthStore";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TestCaseDetail from "./TestCaseDetail";
import TestResults from "./TestResults";

type TestCaseProps = {};

const TestCase: FC<TestCaseProps> = () => {
    const { userId } = useAuthStore();

    const { id: problemId } = useParams();
    const editorRef = useRef<CodeEditorRef | null>(null);

    const [selectedTestCase, setSelectedTestCase] =
        useState<ITestCaseResponse | null>(null);
    const [currentView, setCurrentView] = useState<"test_case" | "test_result">(
        "test_case"
    );

    const { data: testCases } = useQuery({
        queryKey: ["testcases", problemId],
        queryFn: async () => {
            const response = await client.graderService.testCase.getTestCases({
                problemId: Number(problemId),
            });
            return response.data;
        },
    });

    const {
        mutateAsync: submitCodeMutation,
        isPending: isSubmitting,
        data: submitResponse,
    } = useMutation({
        mutationFn: client.graderService.submission.submit.mutation,
    });

    const handleSubmit = async () => {
        setCurrentView("test_result");

        if (editorRef.current) {
            const code = editorRef.current.getEditorInstance()?.getValue();
            const language = editorRef.current.getLanguage();

            if (code && language && userId && problemId) {
                await submitCodeMutation([
                    {
                        code: code,
                        language: language.toUpperCase(),
                        problemId: Number(problemId),
                        userId: userId,
                    },
                ]);
            }
        }
    };

    useEffect(() => {
        if (testCases && testCases.length > 0) {
            setSelectedTestCase(testCases[0]);
        }
    }, [testCases]);

    return (
        <Box
            sx={{
                overflow: "hidden",
                border: "2px solid",
                borderColor: "grey.300",
                borderRadius: 4,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "primary.main",
                    color: "white",
                    padding: "8px 16px",
                }}
            >
                <Button
                    variant="contained"
                    startIcon={<DomainVerificationIcon />}
                    size="small"
                    onClick={() => setCurrentView("test_case")}
                >
                    Testcase
                </Button>

                <Divider orientation="vertical" sx={{ mx: 2 }} />

                <Button
                    variant="contained"
                    startIcon={<TerminalIcon />}
                    size="small"
                    onClick={() => setCurrentView("test_result")}
                    loading={isSubmitting}
                    loadingPosition={"start"}
                >
                    Test Result
                </Button>
            </Box>

            {testCases && selectedTestCase && (
                <Box overflow="auto">
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
                            response={submitResponse?.data!}
                            loading={isSubmitting}
                        />
                    )}
                </Box>
            )}
        </Box>
    );
};
export default TestCase;
