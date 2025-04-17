import { Box, Button, Typography } from "@mui/material";
import {
    isRouteErrorResponse,
    Link,
    useLocation,
    useRouteError,
} from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();
    const location = useLocation();

    const locationError = location.state?.error;

    const getErrorContent = () => {
        let title = "Something went wrong";
        let message = "We're sorry, but there was an unexpected error.";
        let code = "Error";

        if (locationError) {
            const status = locationError.status;

            if (status) {
                code = status.toString();

                if (status === 404) {
                    title = "Page Not Found";
                    message =
                        "Oops! The page you're looking for doesn't exist.";
                } else if (status === 401) {
                    title = "Unauthorized";
                    message = "Please login to access this resource.";
                } else if (status === 403) {
                    title = "Access Denied";
                    message =
                        "You don't have permission to access this resource.";
                } else if (status === 500) {
                    title = "Server Error";
                    message =
                        "Our servers are currently experiencing issues. Please try again later.";
                }
            }

            if (locationError.statusText) {
                title = locationError.statusText;
            }

            if (locationError.message) {
                message = locationError.message;
            }

            return { title, message, code };
        }

        if (isRouteErrorResponse(error)) {
            code = error.status.toString();

            if (error.status === 404) {
                title = "Page Not Found";
                message = "Oops! The page you're looking for doesn't exist.";
            } else if (error.status === 401) {
                title = "Unauthorized";
                message = "Please login to access this resource.";
            } else if (error.status === 403) {
                title = "Access Denied";
                message = "You don't have permission to access this resource.";
            } else if (error.status === 500) {
                title = "Server Error";
                message =
                    "Our servers are currently experiencing issues. Please try again later.";
            }

            if (error.statusText) {
                title = error.statusText;
            }

            if (error.data?.message) {
                message = error.data.message;
            }
        }

        return { title, message, code };
    };

    const { title, message, code } = getErrorContent();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
            }}
        >
            <Typography variant="h1" sx={{ mb: 2 }}>
                {code}
            </Typography>
            <Typography variant="h3" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: "600px" }}>
                {message}
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                >
                    Go Back Home
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        </Box>
    );
};

export default ErrorBoundary;
