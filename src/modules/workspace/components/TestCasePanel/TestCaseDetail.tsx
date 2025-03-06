import { Box, Paper, Typography, useColorScheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type TestCaseDetailProps = {
    label: string;
    content: string;
    color?: string;
};

const TestCaseDetail: FC<TestCaseDetailProps> = ({ label, content, color }) => {
    const { colorScheme } = useColorScheme();

    if (!content) return null;

    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                {label}
            </Typography>
            <Paper
                sx={{ backgroundColor: colorScheme === "dark" ? grey[800] : grey[50] }}
            >
                <Typography color={color} py={1} px={2}>
                    {content}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TestCaseDetail;
