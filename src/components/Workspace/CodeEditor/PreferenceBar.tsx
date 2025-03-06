import { LANGUAGE } from "@/constants/languages";
import { useThemeStore } from "@/store/ThemeStore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";

type PreferenceBarProps = {
    language: string;
    onSelectLanguage: (selectedLanguage?: string) => void;
};

const PreferenceBar: React.FC<PreferenceBarProps> = ({
    language,
    onSelectLanguage,
}) => {
    const { mode } = useThemeStore();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box
            sx={{
                backgroundColor: mode === "dark" ? grey[800] : grey[50],
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "8px 16px",
            }}
        >
            <Button
                color="inherit"
                size="small"
                onClick={handleMenuOpen}
                endIcon={<ExpandMoreIcon />}
            >
                {language}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {
                    setAnchorEl(null);
                }}
            >
                {LANGUAGE.map((lang) => (
                    <MenuItem
                        key={lang}
                        selected={lang === language}
                        onClick={() => {
                            onSelectLanguage(lang);
                            setAnchorEl(null);
                        }}
                    >
                        {lang}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default PreferenceBar;
