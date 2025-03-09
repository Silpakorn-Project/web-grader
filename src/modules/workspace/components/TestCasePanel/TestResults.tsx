import { ITestResultResponse } from "@/services/models/GraderServiceModel";
import { Box, Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useWorkspaceStore } from "../../store/WorkspaceStore";
import TestCaseDetail from "./TestCaseDetail";

type TestResultsProps = {};

const TestResults: FC<TestResultsProps> = () => {
    const { isSubmitting, submitResponse } = useWorkspaceStore();
    const [selectedTestCase, setSelectedTestCase] =
        useState<ITestResultResponse | null>(null);

    useEffect(() => {
        if (submitResponse?.test_cases) {
            setSelectedTestCase(submitResponse.test_cases[0]);
        }
    }, [submitResponse]);

    if (isSubmitting) {
        return (
            <Stack direction="column" spacing={2} p={2}>
                <Stack direction="row" spacing={2}>
                    {[1, 2].map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={80}
                            height={32}
                            sx={{ borderRadius: 1 }}
                        />
                    ))}
                </Stack>

                <Stack spacing={2}>
                    {["Input", "Output", "Expected"].map((_, index) => (
                        <Stack key={index} spacing={1}>
                            <Skeleton
                                variant="rectangular"
                                width={60}
                                height={24}
                            />
                            <Skeleton
                                variant="rectangular"
                                height={80}
                                sx={{ borderRadius: 1 }}
                            />
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        );
    }

    if (!submitResponse) {
        return (
            <Stack
                height="100%"
                alignItems="center"
                justifyContent="center"
                p={2}
            >
                <Typography variant="body1" color="textSecondary">
                    Run your code
                </Typography>
            </Stack>
        );
    }

    return (
        <>
            {submitResponse && (
                <Stack direction="column" spacing={2} p={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color={submitResponse.passed ? "success" : "error"}
                        >
                            {submitResponse.passed ? "Passed" : "Failed"}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Runtime: 0 ms
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        {submitResponse.test_cases.map((testCase, index) => (
                            <Button
                                key={index}
                                color="inherit"
                                variant={
                                    selectedTestCase?.input === testCase.input
                                        ? "contained"
                                        : "text"
                                }
                                onClick={() => setSelectedTestCase(testCase)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 5,
                                        height: 5,
                                        borderRadius: "50%",
                                        backgroundColor: testCase.passed
                                            ? "success.main"
                                            : "error.main",
                                    }}
                                />
                                Case {index + 1}
                            </Button>
                        ))}
                    </Stack>

                    <Stack spacing={2}>
                        {selectedTestCase?.error && (
                            <Paper>
                                <Typography color="error" px={2}>
                                    <pre className="whitespace-pre-wrap">
                                        {selectedTestCase.error}
                                    </pre>
                                </Typography>
                            </Paper>
                        )}

                        <TestCaseDetail
                            label="Input"
                            content={selectedTestCase?.input!}
                        />

                        <TestCaseDetail
                            label="Output"
                            content={selectedTestCase?.actual!}
                        />

                        <TestCaseDetail
                            label="Expected"
                            content={selectedTestCase?.expected!}
                        />
                    </Stack>
                </Stack>
            )}
        </>
    );
};

export default TestResults;
