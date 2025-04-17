import UserMenu from "@/components/UserMenu/UserMenu";
import { useWorkspaceMode } from "@/hooks/useRouteMode";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useSocketStore } from "@/store/SocketStore";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PublishIcon from "@mui/icons-material/Publish";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";
import ProblemsDrawer from "./ProblemsDrawer";

type WorkspaceNavBarProps = {};

const WorkspaceNavBar: FC<WorkspaceNavBarProps> = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { showSnackbar } = useSnackbarStore();
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
    const { isOnlineMode, isStandardMode } = useWorkspaceMode();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutateAsync: submitCodeMutation } = useMutation({
        mutationFn: client.graderService.submission.submit.mutation,
        onMutate: () => setIsSubmitting(true),
        onSuccess: (response, variables) => {
            setSubmitResponse(response.data);
            queryClient.invalidateQueries({
                queryKey: ["submissions", "problems"],
            });

            if (isOnlineMode) {
                const passedTestCases = response.data.testcase_passed;
                const totalTestCases = response.data.testcase_total;
                const percentagePassed =
                    (passedTestCases / totalTestCases) * 100;

                const roomKey = getRoomKey();

                const userPercentage = {
                    roomKey: roomKey,
                    userId: user?.userId || -1,
                    percentage: percentagePassed,
                };

                const isSubmit = variables[0].saveSubmission;

                if (response.data.passed && isSubmit) {
                    navigate("/");
                    showSnackbar("Congratulation, You won!", "success", {
                        vertical: "top",
                        horizontal: "center",
                    });
                }

                updatePercentage(userPercentage);
            }
        },
        onSettled: () => setIsSubmitting(false),
    });

    const handleSubmit = async (saveSubmission: boolean) => {
        if (isOnlineMode && room.problems !== null) {
            problemId = room.problems.toString();
        }

        if (sourceCode && language && problemId && user) {
            setTestCasePanelView("test_result");
            setSubmitResponse(null);

            const response = await submitCodeMutation([
                {
                    code: sourceCode,
                    language: language.toUpperCase(),
                    problemId: isStandardMode
                        ? Number(problemId)
                        : Number(room.problems),
                    userId: user.userId,
                    saveSubmission: saveSubmission,
                },
            ]);

            if (response.data) {
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
            {isStandardMode && (
                <ProblemsDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />
            )}

            <Box display="flex">
                <Button onClick={() => navigate("/")}>
                    <Typography variant="h4">SU</Typography>
                </Button>

                <Divider orientation="vertical" flexItem />
                {isStandardMode && (
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
                )}
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
                >
                    Run
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<PublishIcon />}
                    onClick={() => handleSubmit(true)}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </Box>

            <UserMenu />
        </Box>
    );
};

export default WorkspaceNavBar;
