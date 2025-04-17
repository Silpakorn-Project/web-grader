import Workspace from "@/modules/workspace/pages/Workspace";
import { useSocketStore } from "@/store/SocketStore";
import { useEffect, useRef } from "react";

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
    }, []);

    return <Workspace />;
};

export default PlayOnlinePage;
