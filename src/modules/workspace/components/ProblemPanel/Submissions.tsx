import NoDataPlaceholder from "@/components/NoData";
import { LANGUAGE, STATUS } from "@/constants/common";
import { client } from "@/services";
import {
    ISubmissionResponse,
    ISubmissionsQueryParams,
} from "@/services/models/GraderServiceModel";
import { useAuthStore } from "@/store/AuthStore";
import { getStatusColor } from "@/utilts/common";
import { ArrowDropDown } from "@mui/icons-material";
import {
    Box,
    Menu,
    MenuItem,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmissionDetail from "./SubmissionDetail";

type SubmissionsProps = {};

const Submissions: FC<SubmissionsProps> = () => {
    const { id: problemId } = useParams();
    const { user } = useAuthStore();

    const [viewingSubmission, setViewingSubmission] =
        useState<ISubmissionResponse | null>(null);

    const [status, setStatus] = useState<ISubmissionsQueryParams["status"]>("");
    const [language, setLanguage] =
        useState<ISubmissionsQueryParams["language"]>("");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<"Status" | "Language">("Status");

    const { data: submissions, isLoading } = useQuery({
        queryKey: [
            "submissions",
            { user: user?.userId, problemId, status, language },
        ],
        queryFn: async () => {
            const response =
                await client.graderService.submission.getSubmissions({
                    userId: user?.userId,
                    problemId: Number(problemId),
                    status: status,
                    language: language?.toUpperCase(),
                    sortBy: "createdAt",
                    sortType: "DESC",
                });
            return response.data;
        },
    });

    const handleFilterClick = (
        event: React.MouseEvent<HTMLElement>,
        type: "Status" | "Language"
    ) => {
        setAnchorEl(event.currentTarget);
        setMenuType(type);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (value: string) => {
        if (menuType === "Status") {
            setStatus(value);
        } else if (menuType === "Language") {
            setLanguage(value);
        }
        handleFilterClose();
    };

    useEffect(() => {
        setViewingSubmission(null);
    }, [problemId]);

    if (viewingSubmission) {
        return (
            <SubmissionDetail
                viewingSubmission={viewingSubmission}
                setViewingSubmission={setViewingSubmission}
            />
        );
    }

    return (
        <TableContainer sx={{ overflowY: "scroll" }}>
            <Table size="small">
                <TableHead
                    sx={[
                        {
                            backgroundColor: (theme) =>
                                theme.palette.background.default,
                            position: "sticky",
                            top: 0,
                        },
                        (theme) =>
                            theme.applyStyles("dark", {
                                backgroundColor: grey[900],
                            }),
                    ]}
                >
                    <TableRow>
                        <TableCell sx={{ minWidth: 50 }}>
                            <Typography variant="subtitle2">#</Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200 }}>
                            <Typography
                                variant="subtitle2"
                                onClick={(e) => handleFilterClick(e, "Status")}
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    transition: "opacity 0.3s ease-in-out",
                                    opacity: 0.6,
                                    minWidth: "80px",
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Box component={"span"}>
                                    {status ? status : "Status"}
                                </Box>
                                <ArrowDropDown
                                    fontSize="small"
                                    sx={{ padding: 0, marginLeft: 1 }}
                                />
                            </Typography>
                        </TableCell>

                        <TableCell sx={{ minWidth: 100 }}>
                            <Typography
                                variant="subtitle2"
                                onClick={(e) =>
                                    handleFilterClick(e, "Language")
                                }
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    transition: "opacity 0.3s ease-in-out",
                                    opacity: 0.6,
                                    minWidth: "100px",
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Box component={"span"}>
                                    {language ? language : "Language"}
                                </Box>
                                <ArrowDropDown
                                    fontSize="small"
                                    sx={{ padding: 0, marginLeft: 1 }}
                                />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading ? (
                        [...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton variant="text" width={20} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={100} />
                                    <Skeleton variant="text" width={80} />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width={50} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : submissions && submissions.length > 0 ? (
                        submissions.map((submission, index, arr) => (
                            <TableRow
                                key={submission.submissionId}
                                onClick={() => {
                                    setViewingSubmission(submission);
                                }}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>
                                    <Typography variant="body2">
                                        {arr.length - index}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        fontWeight="medium"
                                        color={getStatusColor(
                                            submission.status
                                        )}
                                    >
                                        {submission.status}
                                    </Typography>
                                    <Typography variant="caption">
                                        {new Date(
                                            submission.updatedAt
                                        ).toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {submission.language}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                <NoDataPlaceholder />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
            >
                <MenuItem onClick={() => handleFilterChange("")}>
                    {menuType}
                </MenuItem>
                {(menuType === "Status" ? STATUS : LANGUAGE).map((val) => (
                    <MenuItem key={val} onClick={() => handleFilterChange(val)}>
                        {val}
                    </MenuItem>
                ))}
            </Menu>
        </TableContainer>
    );
};

export default Submissions;
