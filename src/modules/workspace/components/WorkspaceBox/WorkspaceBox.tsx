import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

type WorkspaceBoxProps = BoxProps & { children: React.ReactNode };

const WorkspaceBox: FC<WorkspaceBoxProps> = ({ children, sx, ...props }) => {
    const defaultSx: SxProps<Theme> = (theme) => ({
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "2px solid",
        borderRadius: 2,
        boxShadow: 1,
        borderColor: grey[300],
        ...theme.applyStyles("dark", {
            borderColor: theme.palette.grey[600],
            backgroundColor: theme.palette.grey[900],
        }),
    });

    return (
        <Box sx={[defaultSx, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
            {children}
        </Box>
    );
};

export default WorkspaceBox;
