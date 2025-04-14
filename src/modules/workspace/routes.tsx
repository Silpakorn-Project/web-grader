import { LazyPage } from "@/components/LazyPage";
import RoutesWithFallback from "@/components/RoutesWithFallback";
import { FC, lazy } from "react";
import { Route } from "react-router-dom";

const WorkspacePage = lazy(() => import("./pages/Workspace"));

export const WorkspaceRoutes: FC = () => {
    return (
        <RoutesWithFallback>
            <Route path="" element={<LazyPage element={WorkspacePage} />} />
        </RoutesWithFallback>
    );
};
