import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignUpPage = lazy(() => import("./pages/Signup"));
const SignUpSuccessPage = lazy(() => import("./pages/SignupSuccess"));

export const SignupRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<SignUpPage />} />
            <Route path="/success" element={<SignUpSuccessPage />} />
        </Routes>
    );
};
