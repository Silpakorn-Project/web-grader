import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { theme } from "@/styles/theme";
import { alpha, Box, Container, Typography } from "@mui/material";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { DatagridPagination } from "../Datagrid/CustomPagination";
import { StyledDataGrid } from "../Datagrid/StyledDataGrid";

type LeaderboardProps = {};

const columns: GridColDef[] = [
    {
        field: "rank",
        headerName: "Rank",
        width: 100,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
    },
    {
        field: "username",
        headerName: "Username",
        flex: 1,
        disableColumnMenu: true,
    },
    {
        field: "score",
        headerName: "Score",
        width: 150,
        headerAlign: "center",
        align: "center",
        disableColumnMenu: true,
    },
];

const Leaderboard: FC<LeaderboardProps> = () => {
    const { user: currentUser } = useAuthStore();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);

    const {
        data: leaderboard,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["leaderboard", paginationModel],
        queryFn: async () => {
            const response =
                await client.graderService.leaderboard.getLeaderboard(
                    paginationModel.page + 1,
                    paginationModel.pageSize,
                    currentUser?.userId
                );

            return response;
        },
        placeholderData: (prev) => prev,
    });

    const { data: currentUserRanking } = useQuery({
        queryKey: ["current-user-ranking"],
        queryFn: async () => {
            if (currentUser) {
                const response =
                    await client.graderService.leaderboard.getUserRanking(
                        currentUser?.userId
                    );
                return response.data;
            }
        },
    });

    useEffect(() => {
        if (leaderboard) {
            setRowCount(leaderboard.totalRecords || 0);
        }
    }, [leaderboard]);

    const handlePaginationModelChange = (
        newPaginationModel: GridPaginationModel
    ) => {
        setPaginationModel({
            page: newPaginationModel.page,
            pageSize: newPaginationModel.pageSize,
        });
    };

    return (
        <Container maxWidth="lg">
            {currentUserRanking && (
                <Box
                    sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        p: 2,
                        borderRadius: 2,
                        mb: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Your Ranking
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Rank
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {currentUserRanking?.rank}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Username
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {currentUserRanking?.username}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Score
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {currentUserRanking?.score}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            )}

            <StyledDataGrid
                rows={leaderboard?.data}
                loading={isLoading}
                columns={columns}
                paginationMode="server"
                rowCount={rowCount}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                disableRowSelectionOnClick
                disableColumnResize
                disableColumnSorting
                disableColumnMenu
                slots={{ pagination: DatagridPagination }}
                getRowClassName={(params) =>
                    params.row.isCurrentUser ? "highlighted-row" : ""
                }
                sx={{
                    height: 500,
                    opacity: isFetching ? 0.5 : 1,
                    pointerEvents: isFetching ? "none" : "auto",
                    transition: "opacity 0.3s ease",
                }}
            />
        </Container>
    );
};

export default Leaderboard;
