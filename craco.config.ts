import { CracoConfig } from "@craco/types";
import path from "path";

const config: CracoConfig = {
    webpack: {
        configure(webpackConfig) {
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                alias: {
                    "@": path.resolve("src"),
                },
                extensions: [".ts", ".tsx", ".js", ".jsx"],
            };

            return webpackConfig;
        },
    },
};

export default config;
