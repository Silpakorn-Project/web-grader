import { CODE_SNIPPETS } from "@/constants/languages";
import { Editor, OnMount } from "@monaco-editor/react";
import { Box } from "@mui/material";
import * as monaco from "monaco-editor";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import PreferenceBar from "./PreferenceBar";

type CodeEditorProps = {};

export type CodeEditorRef = {
    getLanguage: () => string;
    getEditorInstance: () => monaco.editor.IStandaloneCodeEditor | null;
};

const CodeEditor = forwardRef<CodeEditorRef, CodeEditorProps>((_props, ref) => {
    const [language, setLanguage] = useState("java");
    const [value, setValue] = useState(CODE_SNIPPETS[language]);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    const onSelectLanguage = (selectedLanguage?: string) => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
            setValue(CODE_SNIPPETS[selectedLanguage]);
        }
    };

    const onMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    useImperativeHandle(ref, () => ({
        getLanguage: () => language,
        getEditorInstance: () => editorRef.current,
    }));

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
