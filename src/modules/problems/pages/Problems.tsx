import { DatagridPagination } from "@/components/Datagrid/CustomPagination";
import { StyledDataGrid } from "@/components/Datagrid/StyledDataGrid";
import { useDebounce } from "@/hooks/useDebounce";
import { client } from "@/services";
import { getDifficultyColor } from "@/utilts/common";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
    Button,
    Chip,
    Container,
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
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemsFilter from "../components/ProblemsFilter";

type ProblemTableProps = {};

const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, disableColumnMenu: true },
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
    { field: "type", headerName: "Type", flex: 0.7, disableColumnMenu: true },
];

const Problems: FC<ProblemTableProps> = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState<{
        difficulty?: string;
        type?: string;
    }>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const [rowCount, setRowCount] = useState(0);
    const [sortModel, setSortModel] = useState<{
        field: string;
        sort: "asc" | "desc";
    } | null>(null);

    const debouncedSearch = useDebounce(searchQuery);

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
                offset: paginationModel.page + 1,
                limit: paginationModel.pageSize,
                sortBy: sortModel?.field,
                sortType: sortModel?.sort,
            });
        },
        placeholderData: (prev) => prev,
    });

    useEffect(() => {
        if (problems) {
            setRowCount(problems.totalRecords || 0);
        }
    }, [problems]);

    const handleRandomProblem = () => {
        if (problems && problems.data.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * problems.data.length
            );
            navigate(`/problems/${problems.data[randomIndex].problemId}`);
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
                        placeholder="Search"
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
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/admin/create")}
                    startIcon={<AddIcon sx={{ color: "white" }} />}
                    sx={{ cursor: "pointer", display: "inline-flex" }}
                >
                    <Typography sx={{ color: "white" }} variant="subtitle2">
                        Create
                    </Typography>
                </Button>
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

            <StyledDataGrid
                rows={
                    problems
                        ? problems.data.map((p) => ({ ...p, id: p.problemId }))
                        : []
                }
                loading={isLoading}
                columns={columns}
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
