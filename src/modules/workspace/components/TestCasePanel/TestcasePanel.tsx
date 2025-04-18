import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Box, Button, CircularProgress } from "@mui/material";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import TestResults from "./TestResults";
import TestCase from "./Testcase";

type TestCaseProps = {};

const TestCasePanel: FC<TestCaseProps> = () => {
    const { id: problemId } = useParams();
    const {
        isSubmitting,
        testCasePanelView,
        setTestCasePanelView,
        setSubmitResponse,
    } = useWorkspace();

    useEffect(() => {
        setSubmitResponse(null);
    }, [problemId]);

    return (
        <WorkspaceBox>
            <WorkspaceBoxTopBar>
                <Button
                    color="inherit"
                    variant="text"
                    startIcon={<DomainVerificationIcon color="success" />}
                    size="small"
                    onClick={() => setTestCasePanelView("test_case")}
                    sx={{
                        opacity: testCasePanelView === "test_case" ? 1 : 0.5,
                    }}
                >
                    Testcase
                </Button>

                <Button
                    color="inherit"
                    variant="text"
                    startIcon={
                        isSubmitting ? (
                            <CircularProgress color="inherit" size={16}/>
                        ) : (
                            <TerminalIcon color="success" />
                        )
                    }
                    size="small"
                    onClick={() => setTestCasePanelView("test_result")}
                    sx={{
                        opacity: testCasePanelView === "test_result" ? 1 : 0.5,
                    }}
                >
                    Test Result
                </Button>
            </WorkspaceBoxTopBar>

            <Box
                sx={{
                    overflowY: "auto",
                    height: "100%",
                }}
            >
                {testCasePanelView === "test_case" && <TestCase />}
                {testCasePanelView === "test_result" && <TestResults />}
            </Box>
        </WorkspaceBox>
    );
};

export default TestCasePanel;
