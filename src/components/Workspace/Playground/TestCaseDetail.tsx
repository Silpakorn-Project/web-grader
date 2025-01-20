import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";

type TestCaseDetailProps = {
    label: string;
    content: string;
    color?: string;
};

const TestCaseDetail: FC<TestCaseDetailProps> = ({ label, content, color }) => {
    if (!content) return null;

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {label}
            </Typography>
            <Paper sx={{ backgroundColor: "#484444" }}>
                <Typography color={color} py={1} px={2}>
                    {content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TestCaseDetail;
