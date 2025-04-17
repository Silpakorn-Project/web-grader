import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import {
    Button,
    CircularProgress,
    Container,
    Link as MuiLink,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type LoginProps = {};

interface ILoginForm {
    username: string;
    password: string;
}

const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();
    const { setCredential } = useAuthStore();
    const [errorMessage, setErrorMessage] = useState("");

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ILoginForm>();

    const { mutateAsync: loginMutation, isPending } = useMutation({
        mutationFn: client.graderService.authentication.login,
        onSuccess: (response) => {
            setCredential(response.data);
            navigate("/");
        },
        onError: (error) => {
            let errorMsg = "Something went wrong; please try again.";

            if (isAxiosError(error)) {
                if (error?.response?.status === 401) {
                    errorMsg = "Incorrect username or password.";
                }
            }

            setErrorMessage(errorMsg);
        },
    });

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        setErrorMessage("");
        
        await loginMutation({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
                <Stack
                    spacing={2}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message as React.ReactNode}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message as React.ReactNode}
                    />

                    {errorMessage && (
                        <Typography color="error">{errorMessage}</Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isPending}
                    >
                        {isPending ? <CircularProgress size={24} /> : "Login"}
                    </Button>

                    <Typography>
                        Not Registered?{" "}
                        <MuiLink component={Link} to="/signup">
                            Create Account
                        </MuiLink>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Login;
