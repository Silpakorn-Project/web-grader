import { CODE_SNIPPETS, LANGUAGE } from "@/constants/languages";
import { Editor } from "@monaco-editor/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [language, setLanguage] = useState("java");
    const [value, setValue] = useState(CODE_SNIPPETS[language]);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onSelectLanguage = (selectedLanguage?: string) => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
            setValue(CODE_SNIPPETS[selectedLanguage]);
        }
        setAnchorEl(null);
    };

    return (
        <Box className="h-screen">
            <Stack direction="column" bgcolor="#1e1e1e">
                <AppBar position="relative">
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
                            onClose={() => onSelectLanguage()}
                        >
                            {LANGUAGE.map((lang) => (
                                <MenuItem
                                    key={lang}
                                    selected={lang === language}
                                    onClick={() => onSelectLanguage(lang)}
                                    sx={{ fontSize: "0.90rem" }}
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
                        <Editor
                            theme="vs-dark"
                            language={language}
                            value={value}
                            defaultValue={CODE_SNIPPETS[language]}
                            onChange={(value) => setValue(value)}
                        />
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
                                    onClick={() =>
                                        setSelectedTestCase(testCase)
                                    }
                                >
                                    Case {testCase.id}
                                </Button>
                            ))}
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant="subtitle1" gutterBottom>
                                Input
                            </Typography>
                            <Paper sx={{ backgroundColor: "#484444" }}>
                                <Box p={2}>{selectedTestCase.input}</Box>
                            </Paper>
                            <Typography variant="subtitle1" gutterBottom>
                                Output
                            </Typography>
                            <Paper sx={{ backgroundColor: "#484444" }}>
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
        </Box>
    );
};

export default Playground;
