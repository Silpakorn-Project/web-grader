import { LANGUAGE } from "@/constants/languages";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

type PreferenceBarProps = {
    language: string;
    onSelectLanguage: (selectedLanguage?: string) => void;
};

const PreferenceBar: React.FC<PreferenceBarProps> = ({
    language,
    onSelectLanguage,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "primary.main",
                color: "white",
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
                        sx={{ fontSize: "0.90rem" }}
                    >
                        {lang}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default PreferenceBar;
