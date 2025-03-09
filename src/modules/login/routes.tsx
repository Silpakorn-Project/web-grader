import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

export const LoginRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Login />} />
        </Routes>
    );
};
