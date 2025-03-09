import { useAuthStore } from "@/store/AuthStore";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Typography variant="h4" color="primary">
                Su Grader
            </Typography>
            <Typography variant="body1">Welcome to Su Grader</Typography>
            <Button
                variant="contained"
                onClick={() => {
                    navigate(token ? "/problems" : "/login");
                }}
            >
                Get Started
            </Button>
        </Box>
    );
};

export default HomePage;
