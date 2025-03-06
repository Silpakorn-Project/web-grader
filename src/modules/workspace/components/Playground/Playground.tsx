import CodeEditor, { CodeEditorRef } from "@/modules/workspace/components/CodeEditor/CodeEditor";
import { useWorkspaceStore } from "@/store/WorkspaceStore";
import * as monaco from "monaco-editor";
import { useRef } from "react";
import Split from "react-split";
import TestCase from "./TestCase";

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
            minSize={50}
        >
            <CodeEditor
                ref={editorRef}
                onEditorMount={handleEditorMount}
                onLanguageChange={handleLanguageChange}
            />
            <TestCase />
        </Split>
    );
};

export default Playground;
