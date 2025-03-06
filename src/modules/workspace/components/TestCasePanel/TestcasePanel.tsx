import { useWorkspaceStore } from "@/modules/workspace/store/WorkspaceStore";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Box, Button } from "@mui/material";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import TestResults from "./TestResults";
import TestCase from "./Testcase";

type TestCaseProps = {};

const TestCasePanel: FC<TestCaseProps> = () => {
    const { id: problemId } = useParams();
    const { isSubmitting, currentView, setCurrentView, setSubmitResponse } =
        useWorkspaceStore();

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

            <Box
                sx={{
                    overflowY: "auto",
                    height: "calc(100% - 40px)",
                }}
            >
                {currentView === "test_case" && <TestCase />}
                {currentView === "test_result" && <TestResults />}
            </Box>
        </WorkspaceBox>
    );
};

export default TestCasePanel;
