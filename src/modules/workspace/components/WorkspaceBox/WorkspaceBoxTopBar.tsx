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
    const childrenArray = Children.toArray(children);

    return (
        <Box
            sx={[
                {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    padding: "2px 8px",
                    backgroundColor: grey[50],
                },
                (theme) =>
                    theme.applyStyles("dark", {
                        backgroundColor: grey[800],
                    }),
            ]}
            {...props}
        >
            {childrenArray.map((child, index) => (
                <React.Fragment key={index}>
                    {child}
                    {index < childrenArray.length - 1 && (
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={[
                                {
                                    borderColor: grey[300],
                                    borderWidth: 1,
                                },
                                (theme) =>
                                    theme.applyStyles("dark", {
                                        borderColor: grey[600],
                                    }),
                            ]}
                        />
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default WorkspaceBoxTopBar;
