import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import { Box, Button } from "@mui/material"; // Import Table components
import React, { useState } from "react";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";
import ProblemDescription from "./ProblemDescription";
import Submissions from "./Submissions";

type ProblemDescriptionProps = {};

const ProblemPanel: React.FC<ProblemDescriptionProps> = () => {
    const [activeView, setActiveView] = useState<"description" | "submissions">(
        "description"
    );

    return (
        <WorkspaceBox className="h-[calc(97vh-64px)]">
            <WorkspaceBoxTopBar>
                <Button
                    color="inherit"
                    startIcon={<DescriptionIcon color="info" />}
                    size="small"
                    variant="text"
                    onClick={() => setActiveView("description")}
                    sx={{
                        opacity: activeView === "description" ? 1 : 0.5,
                    }}
                >
                    Description
                </Button>
                <Button
                    color="inherit"
                    startIcon={<HistoryIcon color="info" />}
                    size="small"
                    variant="text"
                    onClick={() => setActiveView("submissions")}
                    sx={{
                        opacity: activeView === "submissions" ? 1 : 0.5,
                    }}
                >
                    Submissions
                </Button>
            </WorkspaceBoxTopBar>

            <Box
                sx={{
                    overflow: "auto",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {activeView === "description" ? (
                    <ProblemDescription />
                ) : (
                    <Submissions />
                )}
            </Box>
        </WorkspaceBox>
    );
};

export default ProblemPanel;
