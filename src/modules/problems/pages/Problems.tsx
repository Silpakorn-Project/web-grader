import ProblemTable from "@/modules/problems/components/ProblemTable";
import { client } from "@/services";
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

    if (isLoading || !data) return <p>Loading...</p>;
    if (isError) return <p>Error loading problems.</p>;

    return <ProblemTable problems={data} />;
};
export default Problems;
