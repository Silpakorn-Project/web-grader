import { client } from "@/services";
import {
    Button,
    CircularProgress,
    Container,
    Link,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {};

const Login : FC<LoginProps> = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await client.graderService.authentication.login({
                username: username,
                password: password,
            });

            localStorage.setItem("token", response.data.token);
            navigate("/workspace"); // TODO: navigate to home page
        } catch (error) {
            let errorMessage = "Something went wrong; please try again.";

            if (isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    errorMessage = "Incorrect email or password";
                }
            }

            setErrorMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
                <Stack spacing={2} component="form" onSubmit={handleLogin}>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>

                    <Typography>
                        Not Registered?{" "}
                        <Link href="/signup">Create Account</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Login;
