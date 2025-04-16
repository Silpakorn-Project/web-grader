import { CODE_SNIPPETS } from "@/constants/common";
import { Editor } from "@monaco-editor/react";
import { CircularProgress, useColorScheme } from "@mui/material";
import { FC } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import WorkspaceBox from "../WorkspaceBox/WorkspaceBox";
import PreferenceBar from "./PreferenceBar";

type CodeEditorProps = {};

const CodeEditorPanel: FC<CodeEditorProps> = () => {
    const { sourceCode, setSourceCode, language, setLanguage } = useWorkspace();
    const { colorScheme } = useColorScheme();

    const onSelectLanguage = (selectedLanguage?: string) => {
        if (selectedLanguage) {
            setLanguage(selectedLanguage);
            setSourceCode(CODE_SNIPPETS[selectedLanguage]);
        }
    };

    const onMount = () => {
        setSourceCode(CODE_SNIPPETS[language]);
    };

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
                value={sourceCode}
                defaultValue={CODE_SNIPPETS[language]}
                onChange={(value) => setSourceCode(value!)}
                onMount={onMount}
                options={{
                    minimap: {
                        enabled: false,
                    },
                }}
            />
        </WorkspaceBox>
    );
};

export default CodeEditorPanel;
