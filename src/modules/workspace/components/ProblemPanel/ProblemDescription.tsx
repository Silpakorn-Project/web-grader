import { client } from "@/services";
import { useSocketStore } from "@/store/SocketStore";
import { Box, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ProblemDescriptionProps = {};

const ProblemDescription: FC<ProblemDescriptionProps> = () => {
    const { id } = useParams();
    // const problemId = Number(id);
    const navigate = useNavigate();
    const { room } = useSocketStore();
    let problemId = Number(id);

    if (location.pathname.startsWith("/play-online")) {
        problemId = Number(room.problems);
    }

    const {
        data: problem,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["problems", problemId],
        queryFn: async () => {
            const response = await client.graderService.problems.getProblemById(
                problemId
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
                    <Typography variant="h4">{problem.title}</Typography>
                    <Typography variant="subtitle1">
                        {problem.description}
                    </Typography>
                </>
            ) : null}
        </Box>
    );
};
export default ProblemDescription;
