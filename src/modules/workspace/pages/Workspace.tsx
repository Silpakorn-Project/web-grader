import Playground from "@/modules/workspace/components/Playground/Playground";
import ProblemPanel from "@/modules/workspace/components/ProblemPanel/ProblemPanel";
import WorkspaceNavBar from "@/modules/workspace/components/WorkspaceNavBar/WorkspaceNavBar";
import { Box } from "@mui/material";
import { FC } from "react";
import Split from "react-split";
import { WorkspaceProvider } from "../context/WorkspaceContext";

type WorkspaceProps = {};

const Workspace: FC<WorkspaceProps> = () => {
    return (
        <Box overflow="hidden">
            <WorkspaceProvider>
                <WorkspaceNavBar />
                <Split className="split pb-2 px-2" minSize={0}>
                    <ProblemPanel />
                    <Playground />
                </Split>
            </WorkspaceProvider>
        </Box>
    );
};

export default Workspace;
