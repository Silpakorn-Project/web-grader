import { LazyPage } from "@/components/LazyPage";
import { useAuthStore } from "@/store/AuthStore";
import { FC, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const CreateProblemPage = lazy(() => import("./pages/CreateProblem"));

export const AdminRoutes: FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!user || user.role !== "ADMIN") {
            navigate("/error", {
                state: {
                    error: {
                        status: 403,
                    },
                },
            });
        }
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <Routes>
            <Route path="/create" element={<LazyPage element={CreateProblemPage} />} />
        </Routes>
    );
};
