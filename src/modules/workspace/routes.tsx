import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const WorkspacePage = lazy(() => import("./pages/Workspace"));

export const WorkspaceRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<WorkspacePage />} />
        </Routes>
    );
};
