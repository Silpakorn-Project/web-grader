import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    plugins: [react(), tsconfigPaths()],
    envDir: "./env",
});
