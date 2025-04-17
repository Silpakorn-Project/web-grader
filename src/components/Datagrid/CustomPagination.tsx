import { Box, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";


export function DatagridPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const paginationModel = apiRef.current.state.pagination.paginationModel;

    const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
        apiRef.current.setPageSize(event.target.value as number);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                p: 2,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                    Rows per page:
                </Typography>
                <Select
                    value={paginationModel.pageSize}
                    onChange={handleRowsPerPageChange}
                    size="small"
                    sx={{ minWidth: 80 }}
                >
                    {[5, 10, 20, 100].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                renderItem={(props2) => (       
                    // @ts-expect-error
                    <PaginationItem {...props2} disableRipple />
                )}
                onChange={(_event: React.ChangeEvent<unknown>, value: number) =>
                    apiRef.current.setPage(value - 1)
                }
            />
        </Box>
    );
}
