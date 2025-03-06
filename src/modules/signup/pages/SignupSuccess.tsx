import { Button, Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

const SignupSuccess: FC = () => {
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Registration Successful
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Your account has been created successfully. You can now log
                    in.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                    fullWidth
                >
                    Go to Login
                </Button>
            </Paper>
        </Container>
    );
};

export default SignupSuccess;
