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
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignUpProps = {};

const SignUp: FC<SignUpProps> = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await client.graderService.authentication.register({
                username: username,
                email: email,
                password: password,
            });

            navigate("/");
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
                <Stack spacing={2} component="form" onSubmit={handleLogin}>
                    <Typography variant="h5" gutterBottom>
                        Sign Up
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <Typography color="error">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Register"}
                    </Button>

                    <Typography>
                        Already have an account? <Link href="/">Login</Link>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
};
export default SignUp;
