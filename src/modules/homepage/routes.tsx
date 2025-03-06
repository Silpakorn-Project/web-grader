import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";

export const HomepageRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<HomePage />} />
        </Routes>
    );
};
