import { LazyPage } from "@/components/LazyPage";
import RoutesWithFallback from "@/components/RoutesWithFallback";
import { FC, lazy } from "react";
import { Route } from "react-router-dom";

const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignUpSuccessPage = lazy(() => import("./pages/SignupSuccess"));

export const SignupRoutes: FC = () => {
    return (
        <RoutesWithFallback>
            <Route path="" element={<LazyPage element={SignUpPage} />} />
            <Route
                path="/success"
                element={<LazyPage element={SignUpSuccessPage} />}
            />
        </RoutesWithFallback>
    );
};
