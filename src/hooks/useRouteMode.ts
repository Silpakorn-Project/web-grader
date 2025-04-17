// useRouteMode.ts
import { useLocation } from "react-router-dom";

export function useWorkspaceMode() {
    const location = useLocation();

    return {
        isOnlineMode: location.pathname.startsWith("/online/play"),
        isStandardMode: !location.pathname.startsWith("/online/play"),
        mode: location.pathname.startsWith("/online/play")
            ? "online"
            : "standard",
    };
}
