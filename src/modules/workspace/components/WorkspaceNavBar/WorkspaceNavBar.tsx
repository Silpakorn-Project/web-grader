import UserMenu from "@/components/UserMenu/UserMenu";
import { client } from "@/services";
import { IProblemResponse } from "@/services/models/GraderServiceModel";
import { queryClient } from "@/services/query/queryClient";
import { useAuthStore } from "@/store/AuthStore";
import { useSocketStore } from "@/store/SocketStore";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PublishIcon from "@mui/icons-material/Publish";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";

type WorkspaceNavBarProps = {};

const WorkspaceNavBar: FC<WorkspaceNavBarProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const {
        language,
        isSubmitting,
        sourceCode,
        setIsSubmitting,
        setSubmitResponse,
        setTestCasePanelView,
    } = useWorkspace();
    let { id: problemId } = useParams();
    const { room, getRoomKey, updatePercentage } = useSocketStore();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { data: problems } = useQuery({
        queryKey: ["problems"],
        queryFn: async () => {
            const response = await client.graderService.problems.getProblems();
            return response.data;
        },
    });

    const { mutateAsync: submitCodeMutation } = useMutation({
        mutationFn: client.graderService.submission.submit.mutation,
        onMutate: () => setIsSubmitting(true),
        onSuccess: (response) => {
            setSubmitResponse(response.data);

            const passedTestCases = response.data.testcase_passed;
            const totalTestCases = response.data.testcase_total;
            const percentagePassed = (passedTestCases / totalTestCases) * 100;

            const roomKey = getRoomKey();

            const userPercentage = {
                roomKey: roomKey,
                userId: user?.userId || -1,
                percentage: percentagePassed,
            };

            updatePercentage(userPercentage);
        },
        onSettled: () => setIsSubmitting(false),
    });

    const handleSubmit = async (saveSubmission: boolean) => {
        //change problemid to room.problems if in play online
        if (
            location.pathname.startsWith("/online/play") &&
            room.problems !== null
        ) {
            problemId = room.problems.toString();
        }

        if (sourceCode && language && problemId && user) {
            setTestCasePanelView("test_result");
            setSubmitResponse(null);

            const response = await submitCodeMutation([
                {
                    code: sourceCode,
                    language: language.toUpperCase(),
                    problemId: !location.pathname.startsWith("/online/play")
                        ? Number(problemId)
                        : Number(room.problems),
                    userId: user.userId,
                    saveSubmission: saveSubmission,
                },
            ]);

            if (response.data) {
                queryClient.invalidateQueries({
                    queryKey: ["submissions"],
                });
            }
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
        >
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box width={250} p={2}>
                    <Typography variant="h6">Problem List</Typography>
                    <List>
                        {problems?.map((problem: IProblemResponse) => (
                            <ListItemButton
                                key={problem.problemId}
                                onClick={() => {
                                    navigate(`/problems/${problem.problemId}`);
                                    setDrawerOpen(false);
                                }}
                            >
                                <ListItemText primary={problem.title} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Box display="flex">
                <Button onClick={() => navigate("/")}>
                    <Typography variant="h4">SU</Typography>
                </Button>

                <Divider orientation="vertical" flexItem />
                <IconButton
                    color="inherit"
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <MenuIcon />
                    <Typography variant="h6">Problems List</Typography>
                </IconButton>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
            >
                <Button
                    color="inherit"
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingPosition="start"
                >
                    Run
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<PublishIcon />}
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingPosition="start"
                >
                    Submit
                </Button>
            </Box>

            <UserMenu />
        </Box>
    );
};

export default WorkspaceNavBar;
