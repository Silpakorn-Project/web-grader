import { ISubmissionResponse } from "@/services/models/GraderServiceModel";
import { getStatusColor } from "@/utilts/common";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
    Box,
    Button,
    Card,
    Collapse,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    useColorScheme,
} from "@mui/material";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

type SubmissionDetailProps = {
    viewingSubmission: ISubmissionResponse | null;
    setViewingSubmission: (submission: ISubmissionResponse | null) => void;
};

const MAX_HEIGHT = 220;

const SubmissionDetail: FC<SubmissionDetailProps> = ({
    viewingSubmission,
    setViewingSubmission,
}) => {
    const { colorScheme } = useColorScheme();

    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const codeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (codeRef.current) {
            setIsOverflowing(codeRef.current.scrollHeight > MAX_HEIGHT);
        }
    }, [viewingSubmission]);

    if (!viewingSubmission) {
        return null;
    }

    return (
        <Box>
            <Button
                color="inherit"
                startIcon={<ArrowBackIcon />}
                size="small"
                onClick={() => setViewingSubmission(null)}
                sx={{ p: 1 }}
            >
                <Typography>Back</Typography>
            </Button>
            <Divider />
            <Stack display="flex" direction="column" gap={2} p={2}>
                <Box>
                    <Typography
                        variant="h5"
                        color={getStatusColor(viewingSubmission.status)}
                    >
                        {viewingSubmission.status}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Submitted at {viewingSubmission.updatedAt}
                    </Typography>
                </Box>
                <Typography variant="subtitle2">
                    Language : {viewingSubmission.language}
                </Typography>
                <Card
                    elevation={0}
                    sx={{
                        px: 2,
                        py: 1,
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                        }}
                    >
                        <Tooltip title="Copy to clipboard">
                            <IconButton
                                size="small"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        viewingSubmission.code
                                    )
                                }
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Collapse in={expanded} collapsedSize={MAX_HEIGHT}>
                        <Box ref={codeRef} sx={{ overflow: "hidden" }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <SyntaxHighlighter
                                    language={viewingSubmission.language}
                                    style={colorScheme === "dark" ? vs2015 : vs}
                                    customStyle={{
                                        background: "transparent",
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    {viewingSubmission.code}
                                </SyntaxHighlighter>
                            </Suspense>
                        </Box>
                    </Collapse>

                    {isOverflowing && (
                        <Typography
                            variant="overline"
                            onClick={() => setExpanded((prev) => !prev)}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                mt: 1,
                            }}
                        >
                            {expanded ? "Show Less" : "Show More"}
                        </Typography>
                    )}
                </Card>
            </Stack>
        </Box>
    );
};
export default SubmissionDetail;
