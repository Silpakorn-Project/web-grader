import { LANGUAGE } from "@/constants/languages";
import { Editor } from "@monaco-editor/react";
import {
    AppBar,
    Box,
    Button,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import Split from "react-split";

type PlaygroundProps = {};

const testCases = [
    { id: 1, input: "Input for Test Case 1", output: "Output for Test Case 1" },
    { id: 2, input: "Input for Test Case 2", output: "Output for Test Case 2" },
    { id: 3, input: "Input for Test Case 3", output: "Output for Test Case 3" },
];

// NEED REFACTOR
const Playground: React.FC<PlaygroundProps> = () => {
    const [selectedTestCase, setSelectedTestCase] = useState(testCases[0]);
    const [language, setLanguage] = useState("java");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (selectedLanguage?: string) => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
        }
        setAnchorEl(null);
    };

    return (
        <Stack direction="column" bgcolor="#1e1e1e">
            <AppBar position="static">
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{ minHeight: 25, height: 25 }}
                >
                    <Button
                        color="inherit"
                        size="small"
                        onClick={handleMenuOpen}
                        sx={{
                            fontSize: "1.0rem",
                            textTransform: "none",
                        }}
                    >
                        {language}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => handleMenuClose()}
                        PaperProps={{
                            sx: { mt: 1 },
                        }}
                    >
                        {LANGUAGE.map((lang) => (
                            <MenuItem
                                key={lang}
                                selected={lang === language}
                                onClick={() => handleMenuClose(lang)}
                                sx={{ fontSize: "0.75rem" }}
                            >
                                {lang}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </AppBar>
            <Split
                className="h-[calc(100vh-94px)]"
                direction="vertical"
                sizes={[60, 40]}
                minSize={60}
            >
                <Box>
                    <Editor theme="vs-dark" />
                </Box>

                <Stack direction="column" spacing={2} p={2} overflow="auto">
                    <Stack direction="row" spacing={2}>
                        {testCases.map((testCase) => (
                            <Button
                                key={testCase.id}
                                color="inherit"
                                variant={
                                    selectedTestCase.id === testCase.id
                                        ? "contained"
                                        : "text"
                                }
                                onClick={() => setSelectedTestCase(testCase)}
                            >
                                Case {testCase.id}
                            </Button>
                        ))}
                    </Stack>
                    <Stack spacing={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            Input
                        </Typography>
                        <Paper elevation={-2}>
                            <Box p={2}>{selectedTestCase.input}</Box>
                        </Paper>
                        <Typography variant="subtitle1" gutterBottom>
                            Output
                        </Typography>
                        <Paper elevation={-2}>
                            <Box p={2}>{selectedTestCase.output}</Box>
                        </Paper>
                    </Stack>
                </Stack>
                
            </Split>

            <Box display="flex" p={2} gap={2}>
                <Button variant="contained" color="inherit" size="small">
                    Run
                </Button>
                <Button variant="contained" color="success" size="medium">
                    Submit
                </Button>
            </Box>
        </Stack>
    );
};

export default Playground;
