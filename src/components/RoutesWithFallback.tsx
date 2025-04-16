import { FC, ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

type RoutesWithFallbackProps = {
    children: ReactNode;
    fallbackPath?: string;
};

const RoutesWithFallback: FC<RoutesWithFallbackProps> = ({
    children,
    fallbackPath = "/not-found",
}) => {
    return (
        <Routes>
            {children}
            <Route path="*" element={<Navigate to={fallbackPath} replace />} />
        </Routes>
    );
};

export default RoutesWithFallback;
