import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useColorScheme,
} from "@mui/material";
import { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
    const { mode, setMode } = useColorScheme();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 8,
                padding: 2,
            }}
        >
            <Typography variant="body2">&copy; 2025 Su Grader.</Typography>

            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="mode-select-label">Theme</InputLabel>
                <Select
                    labelId="mode-select-label"
                    id="mode-select"
                    value={mode || "system"}
                    label="Theme"
                    onChange={(e) =>
                        setMode(e.target.value as "light" | "dark" | "system")
                    }
                >
                    <MenuItem value="system">System</MenuItem>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default Footer;
