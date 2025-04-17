// Create a new file: src/components/CodeIllustration.tsx
import { useTheme } from "@mui/material/styles";

const CodeIllustration = () => {
    const theme = useTheme();

    return (
        <svg
            viewBox="0 0 500 400"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width: "100%",
                maxWidth: "500px",
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.15))",
            }}
        >
            {/* Main laptop body */}
            <rect
                x="100"
                y="100"
                width="300"
                height="200"
                rx="10"
                fill={theme.palette.mode === "dark" ? "#333" : "#e0e0e0"}
            />

            {/* Screen */}
            <rect
                x="120"
                y="120"
                width="260"
                height="160"
                rx="5"
                fill={theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5"}
            />

            {/* Code lines */}
            <rect
                x="140"
                y="140"
                width="180"
                height="10"
                rx="2"
                fill={theme.palette.primary.main}
                opacity="0.7"
            />
            <rect
                x="140"
                y="160"
                width="220"
                height="10"
                rx="2"
                fill={theme.palette.mode === "dark" ? "#555" : "#ccc"}
            />
            <rect
                x="140"
                y="180"
                width="160"
                height="10"
                rx="2"
                fill={theme.palette.mode === "dark" ? "#555" : "#ccc"}
            />
            <rect
                x="160"
                y="200"
                width="180"
                height="10"
                rx="2"
                fill={theme.palette.secondary.main}
                opacity="0.7"
            />
            <rect
                x="160"
                y="220"
                width="130"
                height="10"
                rx="2"
                fill={theme.palette.mode === "dark" ? "#555" : "#ccc"}
            />
            <rect
                x="140"
                y="240"
                width="200"
                height="10"
                rx="2"
                fill={theme.palette.primary.main}
                opacity="0.7"
            />

            {/* Laptop base */}
            <path
                d="M80 300 L420 300 L390 350 L110 350 Z"
                fill={theme.palette.mode === "dark" ? "#444" : "#d0d0d0"}
            />

            {/* Keyboard area */}
            <rect
                x="200"
                y="315"
                width="100"
                height="5"
                rx="2"
                fill={theme.palette.mode === "dark" ? "#555" : "#bbb"}
            />

            {/* Flying code elements */}
            <g transform="translate(0, 0)">
                <rect
                    x="360"
                    y="80"
                    width="40"
                    height="30"
                    rx="5"
                    fill={theme.palette.primary.main}
                    opacity="0.8"
                />
                <text
                    x="373"
                    y="100"
                    fontFamily="monospace"
                    fontSize="16"
                    fill="white"
                >
                    {"<>"}
                </text>
            </g>

            <g transform="translate(0, 0)">
                <rect
                    x="80"
                    y="180"
                    width="40"
                    height="30"
                    rx="5"
                    fill={theme.palette.secondary.main}
                    opacity="0.8"
                />
                <text
                    x="93"
                    y="200"
                    fontFamily="monospace"
                    fontSize="16"
                    fill="white"
                >
                    {"{ }"}
                </text>
            </g>

            <g transform="translate(0, 0)">
                <circle
                    cx="430"
                    cy="220"
                    r="20"
                    fill={theme.palette.error.main}
                    opacity="0.8"
                />
                <text
                    x="424"
                    y="226"
                    fontFamily="monospace"
                    fontSize="16"
                    fill="white"
                >
                    {"( )"}
                </text>
            </g>

            {/* Cursor blinking */}
            <rect x="320" y="200" width="5" height="10" rx="1">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    repeatCount="indefinite"
                />
            </rect>

            {/* Glowing circles */}
            <circle
                cx="90"
                cy="90"
                r="15"
                fill={theme.palette.primary.main}
                opacity="0.6"
            />
            <circle
                cx="420"
                cy="300"
                r="10"
                fill={theme.palette.secondary.main}
                opacity="0.6"
            />
        </svg>
    );
};

export default CodeIllustration;
