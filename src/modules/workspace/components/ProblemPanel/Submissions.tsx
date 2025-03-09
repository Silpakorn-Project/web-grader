import { client } from "@/services";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";

type SubmissionsProps = {};

const Submissions: FC<SubmissionsProps> = () => {
    const { id: problemId } = useParams();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Passed":
                return "success";
            case "Failed":
                return "error";
        }
    };

    const { data: submissions } = useQuery({
        queryKey: ["submissions", problemId],
        queryFn: async () => {
            const response =
                await client.graderService.submission.getSubmissions({
                    problemId: Number(problemId),
                });
            return response.data;
        },
    });

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontSize: "14px" }}>
                                {""}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{ fontSize: "14px" }}>
                                Status
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{ fontSize: "14px" }}>
                                Language
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {submissions &&
                        [...submissions]
                            .sort(
                                (a, b) =>
                                    new Date(b.updatedAt).getTime() -
                                    new Date(a.updatedAt).getTime()
                            )
                            .map((submission, index, arr) => (
                                <TableRow key={submission.submissionId}>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            {arr.length - index}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color={getStatusColor(
                                                submission.status
                                            )}
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {submission.status}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "12px",
                                                color: "text.secondary",
                                            }}
                                        >
                                            {new Date(
                                                submission.updatedAt
                                            ).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            {submission.language}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Submissions;
