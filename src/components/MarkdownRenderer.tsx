import { useColorScheme, useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ content }: { content: string }) => {
    const theme = useTheme();
    const { colorScheme } = useColorScheme();

    const borderColor =
        colorScheme === "dark"
            ? theme.palette.grey[700]
            : theme.palette.grey[300];

    const thBackground =
        colorScheme === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[200];

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                table({ children }) {
                    return (
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginTop: theme.spacing(2),
                            }}
                        >
                            {children}
                        </table>
                    );
                },
                th({ children }) {
                    return (
                        <th
                            style={{
                                border: `1px solid ${borderColor}`,
                                padding: theme.spacing(1),
                                backgroundColor: thBackground,
                                textAlign: "left",
                            }}
                        >
                            {children}
                        </th>
                    );
                },
                td({ children }) {
                    return (
                        <td
                            style={{
                                border: `1px solid ${borderColor}`,
                                padding: theme.spacing(1),
                            }}
                        >
                            {children}
                        </td>
                    );
                },
                code({ children }) {
                    return (
                        <code
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? theme.palette.grey[800]
                                        : theme.palette.grey[50],
                                borderRadius: 4,
                                padding: "0.2em 0.4em",
                            }}
                        >
                            {children}
                        </code>
                    );
                },
                pre({ children }) {
                    return (
                        <pre
                            style={{
                                backgroundColor:
                                    colorScheme === "dark"
                                        ? theme.palette.grey[800]
                                        : theme.palette.grey[50],
                                padding: theme.spacing(1),
                                borderRadius: theme.shape.borderRadius,
                            }}
                        >
                            {children}
                        </pre>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
