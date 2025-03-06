import { useThemeStore } from "@/store/ThemeStore";
import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type WorkspaceBoxProps = BoxProps & { children: React.ReactNode };

const WorkspaceBox: FC<WorkspaceBoxProps> = ({ children, sx, ...props }) => {
    const { mode } = useThemeStore();

    const defaultSx: SxProps<Theme> = {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "2px solid",
        borderColor: mode === "dark" ? grey[600] : grey[300],
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: mode === "dark" ? grey[900] : "",
    };

    return (
        <Box sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
            {children}
        </Box>
    );
};

export default WorkspaceBox;
