import { LazyPage } from "@/components/LazyPage";
import RoutesWithFallback from "@/components/RoutesWithFallback";
import { FC, lazy } from "react";
import { Route } from "react-router-dom";

const ProblemsPage = lazy(() => import("./pages/Problems"));

export const ProblemsRoutes: FC = () => {
    return (
        <RoutesWithFallback>
            <Route path="" element={<LazyPage element={ProblemsPage} />} />
        </RoutesWithFallback>
    );
};
