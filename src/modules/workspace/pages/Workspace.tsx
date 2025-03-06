import Playground from "@/modules/workspace/components/Playground/Playground";
import ProblemDetails from "@/modules/workspace/components/ProblemDetail/ProblemDetails";
import WorkspaceNavBar from "@/modules/workspace/components/WorkspaceNavBar";
import { Box } from "@mui/material";
import { FC } from "react";
import Split from "react-split";

type WorkspaceProps = {};

const Workspace: FC<WorkspaceProps> = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            overflow="hidden"
            height="100vh"
        >
            <WorkspaceNavBar />
            <Split className="split pb-2 px-2" minSize={0}>
                <ProblemDetails />
                <Playground />
            </Split>
        </Box>
    );
};

export default Workspace;
