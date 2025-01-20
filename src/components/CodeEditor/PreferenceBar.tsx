import { LANGUAGE } from "@/constants/languages";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AppBar, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import React, { useState } from "react";

type PreferenceBarProps = {
    language: String;
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
        <AppBar position="sticky">
            <Toolbar
                variant="dense"
                disableGutters
                sx={{ minHeight: 40, height: 40, padding: 1 }}
            >
                <Button
                    color="inherit"
                    size="small"
                    onClick={handleMenuOpen}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                        fontSize: "0.90rem",
                        textTransform: "none",
                    }}
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
            </Toolbar>
        </AppBar>
    );
};
export default PreferenceBar;
