import { useDebounce } from "@/hooks/useDebounce";
import { client } from "@/services";
import { IProblemResponse } from "@/services/models/GraderServiceModel";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProblemsDrawerProps = {
    open: boolean;
    onClose: () => void;
};

const LIMIT = 30;

const ProblemsDrawer: FC<ProblemsDrawerProps> = ({ open, onClose }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["problems", debouncedSearch],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await client.graderService.problems.getProblems({
                offset: pageParam,
                limit: LIMIT,
                title: debouncedSearch,
                sortBy: "problemId"
            });
            return {
                ...response,
                currentPage: pageParam,
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.currentPage;
            const totalPages = lastPage.totalPages;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        placeholderData: (prev) => prev,
    });

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box
                width={500}
                p={2}
                sx={{ overflowY: "auto", maxHeight: "100vh" }}
                onScroll={(e) => {
                    const target = e.currentTarget;
                    if (
                        target.scrollTop + target.clientHeight >=
                            target.scrollHeight - 50 &&
                        hasNextPage &&
                        !isFetchingNextPage
                    ) {
                        fetchNextPage();
                    }
                }}
            >
                <Typography variant="h6">Problem List</Typography>

                <Stack m={2}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") refetch();
                        }}
                    />
                </Stack>

                <List
                    sx={{
                        opacity: isFetching ? 0.5 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                >
                    {" "}
                    {data?.pages
                        .flatMap((page) => page.data)
                        .map((problem: IProblemResponse) => (
                            <ListItemButton
                                key={problem.problemId}
                                onClick={() => {
                                    navigate(`/problems/${problem.problemId}`);
                                    onClose();
                                }}
                            >
                                <ListItemText primary={problem.title} />
                            </ListItemButton>
                        ))}
                </List>
                {isFetchingNextPage && (
                    <Typography textAlign="center" py={1}>
                        Loading more...
                    </Typography>
                )}
                {!hasNextPage && (
                    <Typography textAlign="center" py={1}>
                        No more problems.
                    </Typography>
                )}
            </Box>
        </Drawer>
    );
};
export default ProblemsDrawer;
