import CodeEditor, { CodeEditorRef } from "@/components/CodeEditor/CodeEditor";
import { client } from "@/services";
import { ITestCaseResponse } from "@/services/models/GraderServiceModel";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { AppBar, Box, Button, Divider, Stack, Toolbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import TestCaseDetail from "./TestCaseDetail";
import TestResults from "./TestResults";

type PlaygroundProps = {};

const Playground: FC<PlaygroundProps> = () => {
    const { id } = useParams();
    const editorRef = useRef<CodeEditorRef | null>(null);

    const [selectedTestCase, setSelectedTestCase] =
        useState<ITestCaseResponse | null>(null);
    const [currentView, setCurrentView] = useState<"test_case" | "test_result">(
        "test_case"
    );
    const { data: testCases } = useQuery({
        queryKey: ["testcases", id],
        queryFn: async () => {
            const response = await client.graderService.testCase.getTestCases({
                problemId: Number(id),
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
        if (editorRef.current) {
            const code = editorRef.current.getEditorInstance()?.getValue();
            const language = editorRef.current.getLanguage();

            if (code && language) {
                await submitCodeMutation([
                    {
                        code: code,
                        language: language.toUpperCase(),
                        problemId: Number(id),
                        userId: 1,
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
        <Box bgcolor={"#2d2d2d"}>
            <Stack direction="column">
                <Split
                    className="h-[calc(100vh-64px)]"
                    direction="vertical"
                    sizes={[60, 40]}
                    minSize={40}
                >
                    <CodeEditor ref={editorRef} />

                    <Box overflow="auto">
                        <AppBar position="sticky">
                            <Toolbar
                                variant="dense"
                                disableGutters
                                sx={{ minHeight: 40, height: 40, paddingX: 1 }}
                            >
                                <Button
                                    startIcon={<DomainVerificationIcon />}
                                    size="small"
                                    color="inherit"
                                    variant={
                                        currentView === "test_case"
                                            ? "contained"
                                            : "text"
                                    }
                                    onClick={() => setCurrentView("test_case")}
                                >
                                    Testcase
                                </Button>

                                <Divider
                                    orientation="vertical"
                                    sx={{
                                        mx: 2,
                                        borderColor: "rgba(255, 255, 255, 0.3)",
                                    }}
                                />

                                <Button
                                    startIcon={<TerminalIcon />}
                                    size="small"
                                    color="inherit"
                                    variant={
                                        currentView === "test_result"
                                            ? "contained"
                                            : "text"
                                    }
                                    onClick={() =>
                                        setCurrentView("test_result")
                                    }
                                    loading={isSubmitting}
                                    loadingPosition={"start"}
                                >
                                    Test Result
                                </Button>
                            </Toolbar>
                        </AppBar>

                        {testCases && selectedTestCase && (
                            <>
                                {currentView === "test_case" && (
                                    <Stack direction="column" spacing={2} p={2}>
                                        <Stack direction="row" spacing={2}>
                                            {testCases.map(
                                                (testCase, index) => (
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
                                                            setSelectedTestCase(
                                                                testCase
                                                            )
                                                        }
                                                    >
                                                        Case {index + 1}
                                                    </Button>
                                                )
                                            )}
                                        </Stack>
                                        <Stack spacing={2}>
                                            <TestCaseDetail
                                                label="Input"
                                                content={
                                                    selectedTestCase.inputData
                                                }
                                            />
                                            <TestCaseDetail
                                                label="Output"
                                                content={
                                                    selectedTestCase.expectedOutput
                                                }
                                            />
                                        </Stack>
                                    </Stack>
                                )}

                                {currentView === "test_result" && (
                                    <TestResults
                                        response={submitResponse as any}
                                        loading={isSubmitting}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Split>

                <Box display="flex" pt={2} px={2} gap={2}>
                    <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                    >
                        Run
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default Playground;
