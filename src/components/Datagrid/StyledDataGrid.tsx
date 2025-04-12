import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    cursor: "pointer",
    "& .MuiDataGrid-cell:focus": {
        outline: "none",
    },
    "& .MuiDataGrid-cell:focus-within": {
        outline: "none",
    },
    "&, [class^=MuiDataGrid]": { border: "none" },
    "& .MuiDataGrid-row:nth-of-type(even)": {
        backgroundColor: theme.palette.background.default,
    },
    "& .MuiDataGrid-row:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.paper,
    },
}));