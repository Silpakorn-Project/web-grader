import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Problems from "./pages/Problems";

export const ProblemsRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Problems />} />
        </Routes>
    );
};
