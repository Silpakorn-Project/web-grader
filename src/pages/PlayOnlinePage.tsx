import Playground from "@/modules/workspace/components/Playground/Playground";
import ProblemPanel from "@/modules/workspace/components/ProblemPanel/ProblemPanel";
import WorkspaceNavBar from "@/modules/workspace/components/WorkspaceNavBar/WorkspaceNavBar";
import { useSocketStore } from "@/store/SocketStore";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import Split from "react-split";

const PlayOnlinePage: React.FC = () => {
    const { disconnectSocket } = useSocketStore();
    const mounted = useRef(false);

    useEffect(() => { 
        //fix strict mode when you use developer mode because mount unmount twice 
        // and then you will disconnect socket but i don't want to disconnect socket
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        return () => {
            disconnectSocket();
        }
    }, []);

    return (
        <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        height="100vh"
    >
        <WorkspaceNavBar />
        <Split className="split pb-2 px-2" minSize={0}>
            <ProblemPanel />
            <Playground />
        </Split>
    </Box>
    )
}

export default PlayOnlinePage