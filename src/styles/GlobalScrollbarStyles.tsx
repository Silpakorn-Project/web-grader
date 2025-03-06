import { GlobalStyles, useTheme } from "@mui/material";

const GlobalScrollbarStyles = () => {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                /* WebKit-based browsers (Chrome, Safari, Edge) */
                "::-webkit-scrollbar": {
                    width: "8px",
                },
                "::-webkit-scrollbar-track": {
                    background:
                        theme.palette.mode === "dark"
                            ? theme.palette.grey[900]
                            : theme.palette.grey[200],
                    borderRadius: "4px",
                },
                "::-webkit-scrollbar-thumb": {
                    background:
                        theme.palette.mode === "dark"
                            ? theme.palette.grey[700]
                            : theme.palette.grey[400],
                    borderRadius: "4px",
                    "&:hover": {
                        background:
                            theme.palette.mode === "dark"
                                ? theme.palette.grey[600]
                                : theme.palette.grey[500],
                    },
                },

                /* Firefox */
                "*": {
                    scrollbarWidth: "thin",
                    scrollbarColor:
                        theme.palette.mode === "dark"
                            ? `${theme.palette.grey[700]} ${theme.palette.grey[900]}`
                            : `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
                },
            }}
        />
    );
};

export default GlobalScrollbarStyles;
