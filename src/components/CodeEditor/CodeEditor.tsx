import { CODE_SNIPPETS } from "@/constants/languages";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { forwardRef, useState } from "react";
import PreferenceBar from "./PreferenceBar";

type CodeEditorProps = {};

const CodeEditor = forwardRef<
    monaco.editor.IStandaloneCodeEditor | null,
    CodeEditorProps
>((props, ref) => {
    const [language, setLanguage] = useState("java");
    const [value, setValue] = useState(CODE_SNIPPETS[language]);

    const onSelectLanguage = (selectedLanguage?: string) => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
            setValue(CODE_SNIPPETS[selectedLanguage]);
        }
    };

    const onMount: OnMount = (editor) => {
        if (ref) {
            if (typeof ref === "function") {
                ref(editor);
            } else {
                ref.current = editor;
            }
        }
    };

    return (
        <Box>
            <PreferenceBar
                language={language}
                onSelectLanguage={onSelectLanguage}
            />
            <Editor
                height="calc(100% - 40px)"
                theme="vs-dark"
                language={language}
                value={value}
                defaultValue={CODE_SNIPPETS[language]}
                onChange={(value) => setValue(value)}
                onMount={onMount}
            />
        </Box>
    );
});

export default CodeEditor;
