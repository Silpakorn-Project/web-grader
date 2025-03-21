import Playground from "@/modules/workspace/components/Playground/Playground";
import ProblemPanel from "@/modules/workspace/components/ProblemPanel/ProblemPanel";
import WorkspaceNavBar from "@/modules/workspace/components/WorkspaceNavBar/WorkspaceNavBar";
import { Box } from "@mui/material";
import { FC } from "react";
import Split from "react-split";

type WorkspaceProps = {};

const Workspace: FC<WorkspaceProps> = () => {
    return (
        <Box overflow="hidden">
            <WorkspaceNavBar />
            <Split className="split pb-2 px-2" minSize={0}>
                <ProblemPanel />
                <Playground />
            </Split>
        </Box>
    );
};

export default Workspace;
