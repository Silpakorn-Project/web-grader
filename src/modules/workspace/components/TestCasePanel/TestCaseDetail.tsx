import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type TestCaseDetailProps = {
    label: string;
    content: string;
    color?: string;
};

const TestCaseDetail: FC<TestCaseDetailProps> = ({ label, content, color }) => {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {label}
            </Typography>
            <Paper
                sx={[
                    {
                        backgroundColor: grey[50],
                    },
                    (theme) =>
                        theme.applyStyles("dark", {
                            backgroundColor: grey[800],
                        }),
                ]}
            >
                <Typography color={color} py={1} px={2}>
                    {content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TestCaseDetail;
