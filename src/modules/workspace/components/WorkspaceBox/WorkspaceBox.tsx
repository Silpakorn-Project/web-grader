import { Box, BoxProps, SxProps, Theme, useColorScheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type WorkspaceBoxProps = BoxProps & { children: React.ReactNode };

const WorkspaceBox: FC<WorkspaceBoxProps> = ({ children, sx, ...props }) => {
    const { colorScheme } = useColorScheme();

    const defaultSx: SxProps<Theme> = {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "2px solid",
        borderColor: colorScheme === "dark" ? grey[600] : grey[300],
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: colorScheme === "dark" ? grey[900] : "",
    };

    return (
        <Box sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
            {children}
        </Box>
    );
};

export default WorkspaceBox;
