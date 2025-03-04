import UserMenu from "@/components/UserMenu/UserMenu";
import { client } from "@/services";
import MenuIcon from "@mui/icons-material/Menu";
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import PlayArrow icon
import PublishIcon from "@mui/icons-material/Publish";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

type WorkspaceNavBarProps = {};

const WorkspaceNavBar: FC<WorkspaceNavBarProps> = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const { data: problems } = useQuery({
        queryKey: ["problems"],
        queryFn: async () => {
            const response = await client.graderService.problems.getProblems();
            return response.data;
        },
    });

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="#222f3f"
        >
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box width={250} p={2}>
                    <Typography variant="h6">Problem List</Typography>
                    <List>
                        {problems?.map((problem: any) => (
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

            <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "common.white",
                }}
            >
                <MenuIcon />
                <Typography variant="h6" color="common.white">
                    Problems List
                </Typography>
            </IconButton>

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
                >
                    Run
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<PublishIcon />}
                >
                    Submit
                </Button>
            </Box>

            <UserMenu />
        </Box>
    );
};

export default WorkspaceNavBar;
