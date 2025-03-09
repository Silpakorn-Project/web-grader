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
import { useNavigate } from "react-router-dom";

type ProblemTableProps = {
    problems: IProblemResponse[];
};

const ProblemTable: FC<ProblemTableProps> = ({ problems }) => {
    const navigate = useNavigate();

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
                    {problems.map((problem) => (
                        <TableRow
                            key={problem.problemId}
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                navigate(`/problems/${problem.problemId}`);
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
