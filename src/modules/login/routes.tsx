import { LazyPage } from "@/components/LazyPage";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/Login"));

export const LoginRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<LazyPage element={LoginPage} />} />
        </Routes>
    );
};
