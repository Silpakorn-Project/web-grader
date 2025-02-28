import Playground from "@/components/Workspace/Playground/Playground";
import ProblemDescription from "@/components/Workspace/ProblemDescription/ProblemDescription";
import { FC } from "react";
import Split from "react-split";

type WorkspaceProps = {};

const Workspace: FC<WorkspaceProps> = () => {
    return (
        <Split className="split h-screen overflow-hidden" minSize={0}>
            <ProblemDescription />
            <Playground />
        </Split>
    );
};

export default Workspace;
