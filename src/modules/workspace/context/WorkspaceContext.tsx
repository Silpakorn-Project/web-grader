import { ISubmitResponse } from "@/services/models/GraderServiceModel";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";

interface WorkspaceContextType {
    sourceCode: string;
    language: string;
    submitResponse: ISubmitResponse | null;
    isSubmitting: boolean;
    testCasePanelView: "test_case" | "test_result";
    setSourceCode: (code: string) => void;
    setLanguage: (language: string) => void;
    setSubmitResponse: (response: ISubmitResponse | null) => void;
    setIsSubmitting: (isSubmitting: boolean) => void;
    setTestCasePanelView: (view: "test_case" | "test_result") => void;
    reset: () => void;
}

const initialState = {
    sourceCode: "",
    language: "java",
    submitResponse: null as ISubmitResponse | null,
    isSubmitting: false,
    testCasePanelView: "test_case" as const,
};

const WorkspaceContext = createContext<WorkspaceContextType>({
    ...initialState,
    setSourceCode: () => {},
    setLanguage: () => {},
    setSubmitResponse: () => {},
    setIsSubmitting: () => {},
    setTestCasePanelView: () => {},
    reset: () => {},
});

interface WorkspaceProviderProps {
    children: ReactNode;
}

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
    const [sourceCode, setSourceCode] = useState<string>(
        initialState.sourceCode
    );
    const [language, setLanguage] = useState<string>(initialState.language);
    const [submitResponse, setSubmitResponse] =
        useState<ISubmitResponse | null>(initialState.submitResponse);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(
        initialState.isSubmitting
    );
    const [testCasePanelView, setTestCasePanelView] = useState<
        "test_case" | "test_result"
    >(initialState.testCasePanelView);

    const reset = useCallback(() => {
        setSourceCode(initialState.sourceCode);
        setLanguage(initialState.language);
        setSubmitResponse(initialState.submitResponse);
        setIsSubmitting(initialState.isSubmitting);
        setTestCasePanelView(initialState.testCasePanelView);
    }, []);

    const contextValue: WorkspaceContextType = {
        sourceCode,
        language,
        submitResponse,
        isSubmitting,
        testCasePanelView,
        setSourceCode,
        setLanguage,
        setSubmitResponse,
        setIsSubmitting,
        setTestCasePanelView,
        reset,
    };

    return (
        <WorkspaceContext.Provider value={contextValue}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = (): WorkspaceContextType => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error("useWorkspace must be used within a WorkspaceProvider");
    }
    return context;
};
