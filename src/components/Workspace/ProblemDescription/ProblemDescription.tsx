import { client } from "@/services";
import { IProblemResponse } from "@/services/models/GraderServiceModel";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Button, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
    const { id } = useParams();
    const problemId = Number(id);

    const queryClient = useQueryClient();
    const cachedProblems = queryClient.getQueryData<IProblemResponse[]>([
        "problems",
    ]);
    const cachedProblem = cachedProblems?.find(
        (p) => p.problemId === problemId
    );

    const { data } = useQuery({
        queryKey: ["problems", problemId],
        queryFn: async () => {
            if (cachedProblem) return cachedProblem;
            const response = await client.graderService.problems.getProblemById(
                problemId
            );
            return response.data;
        },
        enabled: !cachedProblem,
    });

    const problem = cachedProblem || data;

    return (
        <Box
            sx={{
                overflow: "hidden",
                border: "2px solid",
                borderColor: "grey.300",
                borderRadius: 4,
                boxShadow: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "primary.main",
                    padding: "8px 16px",
                }}
            >
                <Button
                    startIcon={<DescriptionIcon />}
                    size="small"
                    variant="contained"
                >
                    Description
                </Button>
            </Box>

            <Box p={2}>
                {problem ? (
                    <Box>
                        <Typography variant="h4">{problem.title}</Typography>
                        <Typography variant="subtitle1">
                            {problem.description}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1">Problem not found</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ProblemDescription;
