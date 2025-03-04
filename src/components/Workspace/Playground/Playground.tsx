import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import Split from "react-split";
import TestCase from "./TestCase";

type PlaygroundProps = {};

const Playground: FC<PlaygroundProps> = () => {
    return (
        <Box>
            <Stack direction="column">
                <Split
                    className="h-[calc(100vh-64px)]"
                    direction="vertical"
                    sizes={[60, 40]}
                    minSize={50}
                >
                    <CodeEditor/>
                    <TestCase />
                </Split>
            </Stack>
        </Box>
    );
};

export default Playground;
