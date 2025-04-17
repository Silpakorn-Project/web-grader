import UserMenu from "@/components/UserMenu/UserMenu";
import { useWorkspaceMode } from "@/hooks/useRouteMode";
import { client } from "@/services";
import { useAuthStore } from "@/store/AuthStore";
import { useSnackbarStore } from "@/store/SnackbarStore";
import { useSocketStore } from "@/store/SocketStore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PublishIcon from "@mui/icons-material/Publish";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
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
    let { id } = useParams();
    const { room, getRoomKey, updatePercentage } = useSocketStore();
    const { isOnlineMode, isStandardMode } = useWorkspaceMode();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutateAsync: increaseScoreMutation } = useMutation({
        mutationFn: client.graderService.user.increaseScore.mutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-ranking"] });
        },
    });

    const { mutateAsync: runTestsMutation } = useMutation({
        mutationFn: client.graderService.submission.runTests,
        onMutate: () => setIsSubmitting(true),
        onSettled: () => setIsSubmitting(false),
        onSuccess: (response) => {
            setSubmitResponse(response.data);
        },
    });

    const problemId = Number(isOnlineMode ? room.problems : id);

    const { mutateAsync: submitCodeMutation } = useMutation({
        mutationFn: client.graderService.submission.submit,
        onMutate: () => setIsSubmitting(true),
        onSettled: () => setIsSubmitting(false),
        onSuccess: async (response) => {
            setSubmitResponse(response.data);
            queryClient.invalidateQueries({ queryKey: ["submissions"] });
            queryClient.invalidateQueries({ queryKey: ["problems"] });
            queryClient.invalidateQueries({ queryKey: ["user-ranking"] });

            if (isOnlineMode) {
                const { testcase_passed, testcase_total, passed } =
                    response.data;
                const percentagePassed =
                    (testcase_passed / testcase_total) * 100;

                const roomKey = getRoomKey();
                const userId = user?.userId || -1;

                const userPercentage = {
                    roomKey,
                    userId,
                    percentage: percentagePassed,
                };

                updatePercentage(userPercentage);

                if (passed) {
                    const playersWithFullScore = room?.players.filter(
                        (player) => player.percentage === 100
                    );

                    const isFirstToSolve = playersWithFullScore?.length === 0;

                    if (isFirstToSolve) {
                        await increaseScoreMutation([userId, 105]);
                        showSnackbar("🎉 Congratulation, You won!", "success", {
                            vertical: "top",
                            horizontal: "center",
                        });
                    } else {
                        await increaseScoreMutation([userId, 100]);
                        showSnackbar(
                            "✅ You solved it! But someone else was faster.",
                            "info",
                            {
                                vertical: "top",
                                horizontal: "center",
                            }
                        );
                    }
                }

                navigate("/online/summary");
            }
        },
    });

    const { data } = useQuery({
        queryKey: ["user-ranking"],
        queryFn: async () => {
            if (!user) {
                return null;
            }

            const response =
                await client.graderService.leaderboard.getUserRanking(
                    user.userId
                );
            return response.data;
        },
    });

    const handleSubmit = async () => {
        if (user) {
            setTestCasePanelView("test_result");
            setSubmitResponse(null);

            await submitCodeMutation({
                code: sourceCode,
                language: language.toUpperCase(),
                problemId: isStandardMode
                    ? Number(problemId)
                    : Number(room.problems),
                userId: user.userId,
                saveSubmission: isStandardMode,
            });
        }
    };

    const handleRunTests = async () => {
        if (user) {
            setTestCasePanelView("test_result");
            setSubmitResponse(null);

            await runTestsMutation({
                code: sourceCode,
                language: language.toUpperCase(),
                problemId: Number(problemId),
                userId: user.userId,
            });
        }
    };

    const handleRandomProblem = async () => {
        const response = await client.graderService.problems.getRandomProblem();
        if (response.data) {
            navigate(`/problems/${response.data}`);
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
                    <>
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
                        <IconButton
                            color="inherit"
                            onClick={handleRandomProblem}
                        >
                            <ShuffleIcon />
                        </IconButton>
                    </>
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
                    onClick={handleRunTests}
                    disabled={isSubmitting}
                >
                    Run
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<PublishIcon />}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    Submit
                </Button>
            </Box>

            <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <EmojiEventsIcon color="primary" />
                    <motion.div
                        key={data?.score}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1.1, 0.95, 1] }}
                        transition={{ duration: 0.4 }}
                    >
                        <Typography variant="body2" fontWeight="medium">
                            <strong>{data?.score}</strong>
                        </Typography>
                    </motion.div>
                </Stack>
                <UserMenu />
            </Stack>
        </Box>
    );
};

export default WorkspaceNavBar;
