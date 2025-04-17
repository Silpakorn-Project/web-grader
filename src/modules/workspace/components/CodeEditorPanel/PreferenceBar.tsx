import { LANGUAGE } from "@/constants/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import WorkspaceBoxTopBar from "../WorkspaceBox/WorkspaceBoxTopBar";

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
        <WorkspaceBoxTopBar>
            <Box>
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
        </WorkspaceBoxTopBar>
    );
};

export default PreferenceBar;
