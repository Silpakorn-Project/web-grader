import { useThemeStore } from "@/store/ThemeStore";
import { Box, BoxProps, Divider } from "@mui/material"; // Import Divider
import { grey } from "@mui/material/colors";
import React, { Children, FC, ReactNode } from "react";

type WorkspaceBoxTopBarProps = BoxProps & {
    children: ReactNode;
};

const WorkspaceBoxTopBar: FC<WorkspaceBoxTopBarProps> = ({
    children,
    ...props
}) => {
    const { mode } = useThemeStore();

    const childrenArray = Children.toArray(children);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "2px 8px",
                backgroundColor: mode === "dark" ? grey[800] : grey[50],
            }}
            {...props}
        >
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {index < childrenArray.length - 1 && (
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                borderColor:
                                    mode === "dark" ? grey[600] : grey[300],
                                borderWidth: 1,
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default WorkspaceBoxTopBar;
