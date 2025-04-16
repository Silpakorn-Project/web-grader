import Leaderboard from "@/components/Leaderboard/Leaderboard";
import { useAuthStore } from "@/store/AuthStore";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Code from "@mui/icons-material/Code";
import HelpOutline from "@mui/icons-material/HelpOutline";
import School from "@mui/icons-material/School";
import {
    Box,
    Button,
    Container,
    Grid2,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    // TODO: REFACTOR
    return (
        <Stack direction="column" spacing={6}>
            {/* Hero Section */}
            <Box
                sx={{
                    py: 12,
                    width: "100%",
                }}
            >
                <Container maxWidth="lg">
                    <Grid2 container spacing={3} alignItems="center">
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography
                                color="primary"
                                variant="h4"
                                fontWeight="bold"
                                mb={2}
                            >
                                Level Up Your Coding Skills
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Master algorithms, ace technical interviews, and
                                compete with each other through
                                interactive challenges.
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        navigate(user ? "/problems" : "/login")
                                    }
                                    startIcon={<Code />}
                                >
                                    Start Coding Now
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/online")}
                                >
                                    Multiplayer
                                </Button>
                            </Box>
                        </Grid2>

                        <Grid2
                            size={{ xs: 12, md: 6 }}
                            sx={{ display: { xs: "none", md: "block" } }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/005/611/079/non_2x/businessman-designing-a-website-by-coding-on-a-desktop-computer-images-for-web-banners-free-vector.jpg"
                                    style={{
                                        width: "100%",
                                        maxWidth: "500px",
                                        borderRadius: "8px",
                                    }}
                                    alt="Programmer coding on computer"
                                />
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Leaderboard Section */}
            <Box>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                        >
                            Leaderboard
                        </Typography>
                        <Leaderboard />
                    </Box>
                </Container>
            </Box>

            {/* Features Section */}
            <Box>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                        >
                            Features
                        </Typography>
                        <Box>
                            <Grid2
                                container
                                spacing={4}
                                justifyContent="center"
                            >
                                <Grid2>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 3,
                                            textAlign: "center",
                                            borderRadius: "8px",
                                            height: "100%",
                                        }}
                                    >
                                        <School
                                            sx={{
                                                fontSize: 40,
                                                mb: 2,
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography variant="h6">
                                            Solve Problems
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                        >
                                            Practice coding with various
                                            problems to sharpen your skills.
                                        </Typography>
                                    </Paper>
                                </Grid2>
                                <Grid2>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 3,
                                            textAlign: "center",
                                            borderRadius: "8px",
                                            height: "100%",
                                        }}
                                    >
                                        <CheckCircle
                                            sx={{
                                                fontSize: 40,
                                                mb: 2,
                                                color: "success.main",
                                            }}
                                        />
                                        <Typography variant="h6">
                                            Track Progress
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                        >
                                            View your progress and improve with
                                            every problem you solve.
                                        </Typography>
                                    </Paper>
                                </Grid2>
                                <Grid2>
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: 3,
                                            textAlign: "center",
                                            borderRadius: "8px",
                                            height: "100%",
                                        }}
                                    >
                                        <HelpOutline
                                            sx={{
                                                fontSize: 40,
                                                mb: 2,
                                                color: "info.main",
                                            }}
                                        />
                                        <Typography variant="h6">
                                            Learn & Grow
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                        >
                                            Get instant feedback on your
                                            solutions and learn from mistakes.
                                        </Typography>
                                    </Paper>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Stack>
    );
};

export default HomePage;
