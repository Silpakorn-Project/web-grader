import { useWorkspaceMode } from "@/hooks/useRouteMode";
import { client } from "@/services";
import { useSocketStore } from "@/store/SocketStore";
import { getDifficultyColor } from "@/utilts/common";
import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { FC, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

type ProblemDescriptionProps = {};

const ProblemDescription: FC<ProblemDescriptionProps> = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { room } = useSocketStore();
    const { isOnlineMode } = useWorkspaceMode();

    const {
        data: problem,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["problems", id],
        queryFn: async () => {
            const response = await client.graderService.problems.getProblemById(
                isOnlineMode ? Number(room.problems) : Number(id)
            );
            return response.data;
        },
    });

    useEffect(() => {
        if (isAxiosError(error)) {
            if (error.response && error.response.status === 404) {
                navigate("/not-found");
            }
        }
    }, [error]);

    return (
        <Box p={2}>
            {isLoading ? (
                <>
                    <Skeleton
                        variant="text"
                        width="60%"
                        height={40}
                        sx={{ mb: 2 }}
                    />
                    <Skeleton variant="rectangular" width="100%" height={200} />
                </>
            ) : problem ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        {problem.title}
                    </Typography>

                    <Stack direction="row" spacing={1} mb={2}>
                        <Chip
                            label={problem.difficulty}
                            variant="filled"
                            color={getDifficultyColor(problem.difficulty)}
                            size="small"
                        />
                        <Chip
                            label={problem.type}
                            variant="filled"
                            size="small"
                        />
                    </Stack>

                    <ReactMarkdown>{problem.description}</ReactMarkdown>
                </>
            ) : null}
        </Box>
    );
};

export default ProblemDescription;
