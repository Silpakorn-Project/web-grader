import { LazyPage } from "@/components/LazyPage";
import RoutesWithFallback from "@/components/RoutesWithFallback";
import { useAuthStore } from "@/store/AuthStore";
import { FC, lazy, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

const OnlinePage = lazy(() => import("./pages/OnlinePage"));
const PlayOnlinePage = lazy(() => import("./pages/PlayOnlinePage"));
const SummaryPage = lazy(() => import("./pages/SummaryPage"));

export const OnlineRoutes: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <RoutesWithFallback>
            <Route path="/" element={<LazyPage element={OnlinePage} />} />
            <Route
                path="/play"
                element={<LazyPage element={PlayOnlinePage} />}
            />
            <Route
                path="/summary"
                element={<LazyPage element={SummaryPage} />}
            />
        </RoutesWithFallback>
    );
};
