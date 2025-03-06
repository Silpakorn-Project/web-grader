import CodeEditorPanel, { CodeEditorRef } from "@/modules/workspace/components/CodeEditorPanel/CodeEditorPanel";
import { useWorkspaceStore } from "@/modules/workspace/store/WorkspaceStore";
import * as monaco from "monaco-editor";
import { useRef } from "react";
import Split from "react-split";
import TestCasePanel from "../TestCasePanel/TestcasePanel";

const Playground = () => {
    const editorRef = useRef<CodeEditorRef | null>(null);
    const { setEditorInstance, setLanguage } = useWorkspaceStore();

    const handleEditorMount = (
        editor: monaco.editor.IStandaloneCodeEditor | null
    ) => {
        setEditorInstance(editor);
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    return (
        <Split
            className="h-[calc(97vh-64px)]"
            direction="vertical"
            sizes={[60, 40]}
            minSize={38}
        >
            <CodeEditorPanel
                ref={editorRef}
                onEditorMount={handleEditorMount}
                onLanguageChange={handleLanguageChange}
            />
            <TestCasePanel />
        </Split>
    );
};

export default Playground;
