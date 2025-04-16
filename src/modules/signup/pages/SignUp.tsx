import { client } from "@/services";
import {
    Button,
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

type SignUpProps = {};

interface ISignUpForm {
    username: string;
    email: string;
    password: string;
}

const Signup: FC<SignUpProps> = () => {
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISignUpForm>();
    const [errorMessage, setErrorMessage] = useState("");

    const { mutateAsync: registerMutation, isPending } = useMutation({
        mutationFn: client.graderService.authentication.register,
        onSuccess: () => {
            navigate("/signup/success");
        },
        onError: (error) => {
            let errorMsg = "Something went wrong; please try again.";

            if (isAxiosError(error)) {
                if (error?.response?.status === 409) {
                    errorMsg = error.response.data.message;
                }
            }

            setErrorMessage(errorMsg);
        },
    });

    const onSubmit: SubmitHandler<ISignUpForm> = async (data) => {
        setErrorMessage("");

        await registerMutation({
            username: data.username,
            email: data.email,
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
                        Sign Up
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message as React.ReactNode}
                    />
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
                        Register
                    </Button>

                    <Typography>
                        Already have an account?{" "}
                        <MuiLink component={Link} to="/login">
                            Login
                        </MuiLink>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Signup;
