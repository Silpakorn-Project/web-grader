import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorBoundary = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100vh",
                width: "100%",
                position: "fixed",
            }}
        >
            <Typography variant="h2" sx={{ mb: 2 }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/">
                Go Back Home
            </Button>
        </Box>
    );
};

export default ErrorBoundary;
