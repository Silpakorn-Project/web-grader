import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import SignupSuccess from "./pages/SignupSuccess";

export const SignupRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Signup />} />
            <Route path="/success" element={<SignupSuccess />} />
        </Routes>
    );
};
