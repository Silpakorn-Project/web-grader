import { LazyPage } from "@/components/LazyPage";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignUpSuccessPage = lazy(() => import("./pages/SignupSuccess"));

export const SignupRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<LazyPage element={SignUpPage} />} />
            <Route path="/success" element={<LazyPage element={SignUpSuccessPage} />} />
        </Routes>
    );
};
