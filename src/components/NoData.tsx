import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

type NoDataPlaceholderProps = {
    message?: string;
};

const NoDataPlaceholder: FC<NoDataPlaceholderProps> = ({
    message = "No data",
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                py: 4,
                textAlign: "center",
                opacity: 0.6,
            }}
        >
            <SentimentDissatisfiedIcon sx={{ fontSize: 50, mb: 1 }} />
            <Typography variant="h6">{message}</Typography>
        </Box>
    );
};

export default NoDataPlaceholder;
