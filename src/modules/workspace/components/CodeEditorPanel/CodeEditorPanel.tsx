import { CODE_SNIPPETS } from "@/constants/languages";
import { Editor, OnMount } from "@monaco-editor/react";
import { CircularProgress, useColorScheme } from "@mui/material";
import * as monaco from "monaco-editor";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import PreferenceBar from "./PreferenceBar";

type CodeEditorProps = {
    onEditorMount: (editor: monaco.editor.IStandaloneCodeEditor | null) => void;
    onLanguageChange: (language: string) => void;
};

export type CodeEditorRef = {
    getLanguage: () => string;
    getEditorInstance: () => monaco.editor.IStandaloneCodeEditor | null;
};

const CodeEditorPanel = forwardRef<CodeEditorRef, CodeEditorProps>(
    ({ onEditorMount, onLanguageChange }, ref) => {
        const { colorScheme } = useColorScheme();
        const [language, setLanguage] = useState("java");
        const [value, setValue] = useState(CODE_SNIPPETS[language]);
        const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
            null
        );

        const onSelectLanguage = (selectedLanguage?: string) => {
            if (selectedLanguage) {
                setLanguage(selectedLanguage);
                setValue(CODE_SNIPPETS[selectedLanguage]);
                onLanguageChange(selectedLanguage);
            }
        };

        const onMount: OnMount = (editor) => {
            editorRef.current = editor;
            onEditorMount(editor);
        };

        useImperativeHandle(ref, () => ({
            getLanguage: () => language,
            getEditorInstance: () => editorRef.current,
        }));

        return (
            <WorkspaceBox>
                <PreferenceBar
                    language={language}
                    onSelectLanguage={onSelectLanguage}
                />
                <Editor
                    loading={<CircularProgress />}
                    theme={colorScheme === "dark" ? "vs-dark" : "light"}
                    language={language}
                    value={value}
                    defaultValue={CODE_SNIPPETS[language]}
                    onChange={(value) => setValue(value)}
                    onMount={onMount}
                    options={{
                        minimap: {
                            enabled: false,
                        },
                    }}
                />
            </WorkspaceBox>
        );
    }
);

export default CodeEditorPanel;
