import Split from "react-split";
import CodeEditorPanel from "../CodeEditorPanel/CodeEditorPanel";
import TestCasePanel from "../TestCasePanel/TestcasePanel";

const Playground = () => {
    return (
        <Split
            className="h-[calc(97vh-64px)]"
            direction="vertical"
            sizes={[60, 40]}
            minSize={38}
        >
            <CodeEditorPanel />
            <TestCasePanel />
        </Split>
    );
};

export default Playground;
