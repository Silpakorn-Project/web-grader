import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

export const SignupRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<SignUp />} />
        </Routes>
    );
};
