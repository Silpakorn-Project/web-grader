import { Box, Paper, Typography, TypographyOwnProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type TestCaseDetailProps = {
    content: string;
    label?: string;
    fontColor?: TypographyOwnProps["color"];
};

const TestCaseDetail: FC<TestCaseDetailProps> = ({
    label,
    content,
    fontColor,
}) => {
    if (!content) return null;

    return (
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                {label}
            </Typography>
            <Paper
                elevation={0}
                sx={[
                    {
                        backgroundColor: grey[100],
                    },
                    (theme) =>
                        theme.applyStyles("dark", {
                            backgroundColor: grey[800],
                        }),
                ]}
            >
                <Typography
                    color={fontColor}
                    component="pre"
                    sx={{
                        py: 1,
                        px: 2,
                        fontFamily: "monospace",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TestCaseDetail;
