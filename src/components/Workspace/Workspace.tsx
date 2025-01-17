import React from "react";
import Split from "react-split";
import Playground from "./Playground";

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
    return (
        <Split className="split overflow-hidden" minSize={0}>
            <div className="h-screen">Problem</div>
            <Playground />
        </Split>
    );
};
export default Workspace;
