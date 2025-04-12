import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ProblemsPage = lazy(() => import("./pages/Problems"));

export const ProblemsRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProblemsPage />} />
        </Routes>
    );
};
