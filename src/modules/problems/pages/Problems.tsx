import ProblemTable from "@/modules/problems/components/ProblemTable";
import { client } from "@/services";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

type ProblemPageProps = {};

const Problems: FC<ProblemPageProps> = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["problems"],
        queryFn: async () => {
            const response = await client.graderService.problems.getProblems();
            return response.data;
        },
    });

    if (isLoading || !data)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );

    if (isError)
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography color="error">Error loading problems.</Typography>
            </Box>
        );

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
            p={3}
        >
            <Typography variant="h4">Problem List</Typography>
            <Typography variant="subtitle1">
                Browse through the list of problems and select one to start
                solving.
            </Typography>
            <ProblemTable problems={data} />
        </Box>
    );
};

export default Problems;
