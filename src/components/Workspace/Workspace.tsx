import React from "react";
import Split from "react-split";
import Playground from "./Playground";
import ProblemDescription from "./ProblemDescription";

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
    return (
        <Split className="split overflow-hidden" minSize={0}>
            <ProblemDescription />
            <Playground />
        </Split>
    );
};
export default Workspace;
