import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { submitCode, SubmitCodeResponse } from "@/services/api";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { AppBar, Box, Button, Divider, Stack, Toolbar } from "@mui/material";
import * as monaco from "monaco-editor";
import { FC, useRef, useState } from "react";
import Split from "react-split";
import TestCaseDetail from "./TestCaseDetail";
import TestResults from "./TestResults";

type PlaygroundProps = {};

const testCases = [
    {
        testcase_id: 1,
        input: "1 2",
        expected_output: "3\n",
    },
    {
        testcase_id: 2,
        input: "-5 10",
        expected_output: "5\n",
    },
];

const Playground: FC<PlaygroundProps> = () => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const [selectedTestCase, setSelectedTestCase] = useState(testCases[0]);
    const [currentView, setCurrentView] = useState<"test_case" | "test_result">(
        "test_case"
    );

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<SubmitCodeResponse | null>(null);

    const handleViewChange = (view: "test_case" | "test_result") => {
        setCurrentView(view);
    };

    const handleSubmit = async () => {
        setCurrentView("test_result");

        if (editorRef.current) {
            const code = editorRef.current.getValue();

            try {
                setIsLoading(true);

                const response = await submitCode({
                    source_code: code,
                    test_cases: testCases,
                });

                setResponse(response);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

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
                                    onClick={() =>
                                        handleViewChange("test_case")
                                    }
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
                                        handleViewChange("test_result")
                                    }
                                    loading={isLoading}
                                    loadingPosition={"start"}
                                >
                                    Test Result
                                </Button>
                            </Toolbar>
                        </AppBar>

                        {currentView === "test_case" && (
                            <Stack direction="column" spacing={2} p={2}>
                                <Stack direction="row" spacing={2}>
                                    {testCases.map((testCase, index) => (
                                        <Button
                                            key={index}
                                            color="inherit"
                                            variant={
                                                selectedTestCase.testcase_id ===
                                                testCase.testcase_id
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
                                        content={selectedTestCase.input}
                                    />
                                    <TestCaseDetail
                                        label="Output"
                                        content={
                                            selectedTestCase.expected_output
                                        }
                                    />
                                </Stack>
                            </Stack>
                        )}

                        {currentView === "test_result" && (
                            <TestResults
                                response={response}
                                loading={isLoading}
                            />
                        )}
                    </Box>
                </Split>

                <Box display="flex" pt={2} px={2} gap={2}>
                    <Button
                        variant="contained"
                        color="inherit"
                        size="small"
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        Run
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleSubmit}
                        loading={isLoading}
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default Playground;
