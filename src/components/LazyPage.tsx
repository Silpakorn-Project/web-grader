import React, { FC, Suspense } from "react";
import Loading from "./Loading";

interface ILazyPageProps {
    element: React.LazyExoticComponent<any>;
}

export const LazyPage: FC<ILazyPageProps> = ({ element: Component }) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};
