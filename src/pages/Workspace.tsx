import Playground from "@/components/Workspace/Playground/Playground";
import ProblemDescription from "@/components/Workspace/ProblemDescription/ProblemDescription";
import WorkspaceNavBar from "@/components/Workspace/WorkspaceNavBar/WorkspaceNavBar";
import { Box } from "@mui/material";
import { FC } from "react";
import Split from "react-split";

type WorkspaceProps = {};

const Workspace: FC<WorkspaceProps> = () => {
    return (
        <Box
            height="100vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
        >
            <WorkspaceNavBar />
            <Split className="split" minSize={0}>
                <ProblemDescription />
                <Playground />
            </Split>
        </Box>
    );
};

export default Workspace;
