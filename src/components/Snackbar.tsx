import { useSnackbarStore } from "@/store/SnackbarStore";
import { Alert, Snackbar } from "@mui/material";

const GlobalSnackbar = () => {
    const { open, message, severity, closeSnackbar } = useSnackbarStore();

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={closeSnackbar}
        >
            <Alert onClose={closeSnackbar} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
