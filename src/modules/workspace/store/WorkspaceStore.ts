import { ISubmitResponse } from "@/services/models/GraderServiceModel";
import * as monaco from "monaco-editor";
import { create } from "zustand";

interface WorkspaceStore {
    editorInstance: monaco.editor.IStandaloneCodeEditor | null;
    language: string;
    submitResponse: ISubmitResponse | null;
    isSubmitting: boolean;
    testCasePanelView: "test_case" | "test_result";
    setEditorInstance: (
        editor: monaco.editor.IStandaloneCodeEditor | null
    ) => void;
    setLanguage: (language: string) => void;
    setSubmitResponse: (response: ISubmitResponse | null) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    setTestCasePanelView: (view: "test_case" | "test_result") => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
    editorInstance: null,
    language: "java",
    submitResponse: null,
    isSubmitting: false,
    testCasePanelView: "test_case",
    setEditorInstance: (editor) => set({ editorInstance: editor }),
    setLanguage: (language) => set({ language }),
    setSubmitResponse: (response) => set({ submitResponse: response }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    setTestCasePanelView: (view) => set({ testCasePanelView: view }),
}));
