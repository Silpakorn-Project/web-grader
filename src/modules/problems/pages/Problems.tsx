import { DatagridPagination } from "@/components/Datagrid/CustomPagination";
import { StyledDataGrid } from "@/components/Datagrid/StyledDataGrid";
import { useDebounce } from "@/hooks/useDebounce";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { getDifficultyColor } from "@/utilts/common";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Input,
    InputAdornment,
    Stack,
    Typography,
} from "@mui/material";
import {
    GridColDef,
    GridPaginationModel,
    GridSortModel,
} from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemsFilter from "../components/ProblemsFilter";

type ProblemTableProps = {};

const Problems: FC<ProblemTableProps> = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuthStore();

    const [filters, setFilters] = useState<{
        difficulty?: string;
        type?: string;
        status?: string;
    }>({});
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery);

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [rowCount, setRowCount] = useState(0);
    const [sortModel, setSortModel] = useState<{
        field: string;
        sort: "asc" | "desc";
    } | null>({ field: "problemId", sort: "asc" });

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [problemToDelete, setProblemToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const {
        data: problems,
        isFetching,
        isLoading,
    } = useQuery({
        queryKey: [
            "problems",
            { filters, paginationModel, debouncedSearch, sortModel },
        ],
        queryFn: async () => {
            return await client.graderService.problems.getProblems({
                title: debouncedSearch,
                type: filters.type,
                difficulty: filters.difficulty,
                status: filters.status,
                userId: user?.userId,
                offset: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                sortBy: sortModel?.field,
                sortType: sortModel?.sort,
            });
        },
        placeholderData: (prev) => prev,
    });

    const { mutateAsync: deleteProblemMutation } = useMutation({
        mutationFn: client.graderService.problems.deleteProblem,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["problems"] });
        },
    });

    useEffect(() => {
        if (problems) {
            setRowCount(problems.totalRecords || 0);
        }
    }, [problems]);

    const handleRandomProblem = async () => {
        const response = await client.graderService.problems.getRandomProblem();
        if (response.data) {
            navigate(`/problems/${response.data}`);
        }
    };

    const handlePaginationModelChange = (
        newPaginationModel: GridPaginationModel
    ) => {
        setPaginationModel(newPaginationModel);
    };

    const handleSortModelChange = (newSortModel: GridSortModel) => {
        if (newSortModel.length > 0) {
            const { field, sort } = newSortModel[0];

            if (field && sort) {
                setSortModel({ field, sort });
            }
        } else {
            setSortModel(null);
        }
    };

    const handleFilterChange = (newFilters: {
        difficulty?: string;
        type?: string;
    }) => {
        setFilters(newFilters);
    };

    const handleRemoveFilter = (filterKey: keyof typeof filters) => {
        setFilters((prev) => {
            const updatedFilters = { ...prev };
            delete updatedFilters[filterKey];
            return updatedFilters;
        });
    };

    const handleDeleteClick = (e: React.MouseEvent, problemId: number) => {
        e.stopPropagation();
        setProblemToDelete(problemId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (problemToDelete) {
            deleteProblemMutation(problemToDelete);
            setDeleteDialogOpen(false);
            setProblemToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setProblemToDelete(null);
    };

    const getColumns = (): GridColDef[] => {
        const baseColumns: GridColDef[] = [
            {
                field: "status",
                headerName: "Status",
                sortable: false,
                renderCell: (params) => {
                    const value = params.value;

                    if (value === "Passed") {
                        return (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="start"
                                width="100%"
                                height="100%"
                            >
                                <CheckCircleOutlineIcon color="success" />
                            </Box>
                        );
                    }

                    if (value && value !== "Unattempted") {
                        return (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="start"
                                width="100%"
                                height="100%"
                            >
                                <HighlightOffIcon color="warning" />
                            </Box>
                        );
                    }

                    return null;
                },
                disableColumnMenu: true,
            },
            {
                field: "title",
                headerName: "Title",
                flex: 1,
                disableColumnMenu: true,
            },
            {
                field: "difficulty",
                headerName: "Difficulty",
                flex: 0.7,
                disableColumnMenu: true,
                renderCell: (params) => (
                    <Chip
                        label={params.value}
                        color={getDifficultyColor(params.value)}
                        variant="outlined"
                    />
                ),
            },
            {
                field: "type",
                headerName: "Type",
                flex: 0.7,
                disableColumnMenu: true,
            },
        ];

        if (isAdmin) {
            baseColumns.push({
                field: "actions",
                headerName: "Actions",
                sortable: false,
                disableColumnMenu: true,
                flex: 0.5,
                renderCell: (params) => (
                    <Box
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="start"
                    >
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                        `/admin/problems/edit/${params.row.problemId}`
                                    );
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                size="small"
                                onClick={(e) =>
                                    handleDeleteClick(e, params.row.problemId)
                                }
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Box>
                ),
            });
        }

        return baseColumns;
    };

    return (
        <Container maxWidth="lg">
            <Stack
                display="flex"
                direction="row"
                justifyContent="end"
                alignItems="center"
                gap={2}
                my={4}
            >
                <ProblemsFilter
                    onChange={handleFilterChange}
                    selectedFilters={filters}
                />

                <FormControl variant="standard" size="small">
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        placeholder="Search title"
                    />
                </FormControl>
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={handleRandomProblem}
                    startIcon={<ShuffleIcon sx={{ color: "white" }} />}
                    sx={{ cursor: "pointer", display: "inline-flex" }}
                >
                    <Typography sx={{ color: "white" }} variant="subtitle2">
                        Random
                    </Typography>
                </Button>

                {isAdmin && (
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/admin/problems/create")}
                        startIcon={<AddIcon sx={{ color: "white" }} />}
                        sx={{ cursor: "pointer", display: "inline-flex" }}
                    >
                        <Typography sx={{ color: "white" }} variant="subtitle2">
                            Create
                        </Typography>
                    </Button>
                )}
            </Stack>

            <Stack direction="row" spacing={1} my={2}>
                {Object.entries(filters).map(([key, value]) =>
                    value ? (
                        <Chip
                            key={key}
                            label={value}
                            onDelete={() =>
                                handleRemoveFilter(key as keyof typeof filters)
                            }
                            variant="filled"
                        />
                    ) : null
                )}
            </Stack>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this problem? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <StyledDataGrid
                rows={
                    problems
                        ? problems.data.map((p) => ({ ...p, id: p.problemId }))
                        : []
                }
                loading={isLoading}
                columns={getColumns()}
                paginationMode="server"
                sortingMode="server"
                rowCount={rowCount}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                onSortModelChange={handleSortModelChange}
                disableRowSelectionOnClick
                disableColumnResize
                onRowClick={(params) => navigate(`/problems/${params.id}`)}
                slots={{ pagination: DatagridPagination }}
                sx={{
                    height: 500,
                    cursor: isFetching ? "not-allowed" : "pointer",
                    opacity: isFetching ? 0.5 : 1,
                    pointerEvents: isFetching ? "none" : "auto",
                    transition: "opacity 0.3s ease",
                }}
            />
        </Container>
    );
};

export default Problems;
