import { SubmitCodeResponse, TestCaseResponse } from "@/api/api";
import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import TestCaseDetail from "./TestCaseDetail";

type TestResultsProps = {
    response: SubmitCodeResponse | null;
    loading?: boolean;
};

const TestResults: FC<TestResultsProps> = ({ response, loading }) => {
    const [selectedTestCase, setSelectedTestCase] =
        useState<TestCaseResponse | null>(null);

    useMemo(() => {
        if (response) {
            setSelectedTestCase(response.test_cases[0]);
        }
    }, [response]);

    if (loading) {
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

    return (
        <>
            {response && (
                <Stack direction="column" spacing={2} p={2}>
                    <Stack direction="row" spacing={2}>
                        {response.test_cases.map((testCase, index) => (
                            <Button
                                key={index}
                                color="inherit"
                                variant={
                                    selectedTestCase?.input === testCase.input
                                        ? "contained"
                                        : "text"
                                }
                                onClick={() => setSelectedTestCase(testCase)}
                            >
                                Case {index + 1}
                            </Button>
                        ))}
                    </Stack>

                    <Stack spacing={2}>
                        {selectedTestCase?.error && (
                            <Paper sx={{ backgroundColor: "#382c2c" }}>
                                <Typography color="error" px={2}>
                                    <pre>{selectedTestCase.error}</pre>
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
