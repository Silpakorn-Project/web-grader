import { router } from "@/rounter/rounter";
import { useSocketStore } from "@/store/SocketStore";
import { Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

const GlobalCountdownWatcher = () => {
    const { countdown } = useSocketStore();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (countdown === 0) {
            setOpen(true);
        }
    }, [countdown]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleRedirect = () => {
        router.navigate("/online/play");
    };

    return (
        <Snackbar
            open={open}
            color="success"
            onClose={handleClose}
            autoHideDuration={8000}
            message="The game has started!"
            action={
                <Button color="primary" size="small" onClick={handleRedirect}>
                    Join Now
                </Button>
            }
        />
    );
};

export default GlobalCountdownWatcher;
