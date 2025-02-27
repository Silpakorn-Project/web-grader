import router from "@/rounter/rounter";
import { useAuthStore } from "@/store/AuthStore";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {
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
                    router.navigate(token ? "/problems" : "/login");
                }}
            >
                Get Started
            </Button>
        </Box>
    );
};

export default HomePage;
