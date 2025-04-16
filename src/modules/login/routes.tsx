import { LazyPage } from "@/components/LazyPage";
import RoutesWithFallback from "@/components/RoutesWithFallback";
import { FC, lazy } from "react";
import { Route } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/Login"));

export const LoginRoutes: FC = () => {
    return (
        <RoutesWithFallback>
            <Route path="" element={<LazyPage element={LoginPage} />} />
        </RoutesWithFallback>
    );
};
