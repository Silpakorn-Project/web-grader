import { client } from "@/services";
import { ITestCaseResponse } from "@/services/models/GraderServiceModel";
import { useSocketStore } from "@/store/SocketStore";
import { Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestCaseDetail from "./TestCaseDetail";

type TestCaseProps = {};

const TestCase: FC<TestCaseProps> = () => {
    const { id: problemId } = useParams();
    const { room } = useSocketStore();
    const [selectedTestCase, setSelectedTestCase] =
        useState<ITestCaseResponse | null>(null);

    const { data: testCases } = useQuery({
        queryKey: ["testcases", problemId],
        queryFn: async () => {
            const response = await client.graderService.testCase.getTestCases({
                problemId: !location.pathname.startsWith("/play-online")
                    ? Number(problemId)
                    : Number(room.problems),
                offset: 1,
                limit: 3,
            });
            return response.data;
        },
    });

    useEffect(() => {
        if (testCases && testCases.length > 0) {
            setSelectedTestCase(testCases[0]);
        } else {
            setSelectedTestCase(null);
        }
    }, [problemId, testCases]);

    if (!testCases) {
        return null;
    }

    return (
        <Stack direction="column" spacing={2} p={2}>
            {testCases && selectedTestCase && (
                <>
                    <Stack direction="row" spacing={2}>
                        {testCases.map((testCase, index) => (
                            <Button
                                key={index}
                                color="inherit"
                                variant={
                                    selectedTestCase?.testcaseId ===
                                    testCase.testcaseId
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
                        <TestCaseDetail
                            label="Input"
                            content={selectedTestCase?.inputData || ""}
                        />
                        <TestCaseDetail
                            label="Output"
                            content={selectedTestCase?.expectedOutput || ""}
                        />
                    </Stack>
                </>
            )}
        </Stack>
    );
};

export default TestCase;
