import router from "@/rounter/rounter";
import { IProblemResponse } from "@/services/models/GraderServiceModel";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { FC } from "react";

type ProblemTableProps = {
    problems: IProblemResponse[];
};

const ProblemTable: FC<ProblemTableProps> = ({ problems }) => {

    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {problems.map((problem, index) => (
                        <TableRow
                            key={problem.problemId}
                            sx={{
                                backgroundColor:
                                    index % 2 === 0 ? "#1b1a1b" : "#282828",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                router.navigate(
                                    `/problems/${problem.problemId}`
                                );
                            }}
                        >
                            <TableCell>{problem.problemId}</TableCell>
                            <TableCell>{problem.title}</TableCell>
                            <TableCell>{problem.description}</TableCell>
                            <TableCell>{problem.difficulty}</TableCell>
                            <TableCell>{problem.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProblemTable;
