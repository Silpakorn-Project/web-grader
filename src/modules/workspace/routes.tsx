import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Workspace from "./pages/Workspace";

export const WorkspaceRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Workspace />} />
        </Routes>
    );
};
