import { TYPES } from "@/constants/common";
import { client } from "@/services";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type TestCase = {
    testcaseId?: number;
    inputData: string;
    expectedOutput: string;
    markedForDelete?: boolean;
};

type FormValues = {
    title: string;
    description: string;
    difficulty: string;
    type: string;
    testCases: TestCase[];
    jsonTestCases: string;
};

const EditProblem: FC = () => {
    const { id } = useParams();
    const { showSnackbar } = useSnackbarStore();
    const queryClient = useQueryClient();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletedTestCaseIds, setDeletedTestCaseIds] = useState<number[]>([]);

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            difficulty: "EASY",
            type: "",
            testCases: [{ inputData: "", expectedOutput: "" }],
            jsonTestCases: "",
        },
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "testCases",
    });

    const [
        { data: problemData, isLoading: isLoadingProblem },
        { data: testCasesData, isLoading: isLoadingTestCases },
    ] = useQueries({
        queries: [
            {
                queryKey: ["problem", id],
                queryFn: async () => {
                    const response =
                        await client.graderService.problems.getProblemById(
                            Number(id)
                        );
                    return response.data;
                },
                enabled: !!id,
            },
            {
                queryKey: ["testCases", id],
                queryFn: async () => {
                    const response =
                        await client.graderService.testCase.getTestCases({
                            problemId: Number(id),
                        });
                    return response.data;
                },
                enabled: !!id,
            },
        ],
    });

    const { mutateAsync: createTestCasesMutation } = useMutation({
        mutationFn: client.graderService.testCase.createTestcases,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["testcases"],
            });
        },
    });

    const { mutateAsync: updateTestCaseMutation } = useMutation({
        mutationFn: ({
            testcaseId,
            inputData,
            expectedOutput,
        }: {
            testcaseId: number;
            inputData: string;
            expectedOutput: string;
        }) =>
            client.graderService.testCase.updateTestcase(
                { inputData, expectedOutput },
                testcaseId
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["testcases"],
            });
        },
    });

    const { mutateAsync: deleteTestCaseMutation } = useMutation({
        mutationFn: (testcaseId: number) =>
            client.graderService.testCase.deleteTestcase(testcaseId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["testcases"],
            });
        },
    });

    const { mutateAsync: updateProblemMutation } = useMutation({
        mutationFn: (
            formData: Omit<FormValues, "testCases" | "jsonTestCases">
        ) => client.graderService.problems.updateProblem(formData, Number(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["problems"],
            });
            queryClient.invalidateQueries({
                queryKey: ["problem", id],
            });
        },
    });

    useEffect(() => {
        if (problemData) {
            reset((prev) => ({
                ...prev,
                title: problemData.title,
                description: problemData.description,
                difficulty: problemData.difficulty,
                type: problemData.type,
            }));
        }

        if (testCasesData && Array.isArray(testCasesData)) {
            const mapped = testCasesData.map((tc) => ({
                testcaseId: tc.testcaseId,
                inputData: tc.inputData,
                expectedOutput: tc.expectedOutput,
            }));
            replace(mapped);
        }
    }, [problemData, testCasesData, reset, replace]);

    const handleRemove = (index: number) => {
        const testCase = fields[index];

        if (testCase.testcaseId) {
            handleToggleDelete(index);
        } else {
            remove(index);
        }
    };

    const handleToggleDelete = (index: number) => {
        const testCase = fields[index];

        const updatedTestCase = {
            ...testCase,
            markedForDelete: !testCase.markedForDelete,
        };

        if (testCase.testcaseId) {
            setDeletedTestCaseIds((prev) => {
                if (updatedTestCase.markedForDelete) {
                    return [...prev, testCase.testcaseId!];
                } else {
                    return prev.filter((id) => id !== testCase.testcaseId);
                }
            });
        }

        replace([
            ...fields.slice(0, index),
            updatedTestCase,
            ...fields.slice(index + 1),
        ]);
    };

    const onSubmit = async (formData: FormValues) => {
        try {
            await updateProblemMutation({
                title: formData.title,
                description: formData.description,
                difficulty: formData.difficulty,
                type: formData.type,
            });

            const testCasesToUpdate = formData.testCases.filter(
                (tc) => tc.testcaseId != null && !tc.markedForDelete
            );

            const newTestCases = formData.testCases.filter(
                (tc) => tc.testcaseId == null && !tc.markedForDelete
            );

            const testCasesToDelete = deletedTestCaseIds;

            await Promise.all(
                testCasesToUpdate.map((tc) =>
                    updateTestCaseMutation({
                        testcaseId: tc.testcaseId!,
                        inputData: tc.inputData,
                        expectedOutput: tc.expectedOutput,
                    })
                )
            );

            if (newTestCases.length > 0) {
                await createTestCasesMutation({
                    problemId: Number(id),
                    testcases: newTestCases.map((tc) => ({
                        inputData: tc.inputData,
                        expectedOutput: tc.expectedOutput,
                    })),
                });
            }

            await Promise.all(
                testCasesToDelete.map((testcaseId) =>
                    deleteTestCaseMutation(testcaseId)
                )
            );

            showSnackbar("Problem updated successfully!", "success");
        } catch (error) {
            showSnackbar("Something went wrong while saving changes.", "error");
        }
    };

    if (isLoadingProblem || isLoadingTestCases) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Paper sx={{ p: 4, width: "100%", maxWidth: 700 }}>
                    <Stack spacing={2}>
                        <Skeleton variant="text" height={40} width="50%" />
                        <Skeleton variant="rectangular" height={56} />
                        <Skeleton variant="rectangular" height={160} />
                        <Skeleton variant="rectangular" height={56} />
                        <Skeleton variant="rectangular" height={56} />
                        <Skeleton variant="text" height={30} width="30%" />
                        <Skeleton variant="rectangular" height={120} />
                        <Skeleton variant="rectangular" height={40} />
                    </Stack>
                </Paper>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper sx={{ p: 4, width: "100%", maxWidth: 700 }}>
                <Typography variant="h5" mb={4} gutterBottom>
                    Edit Problem
                </Typography>
                <Stack
                    spacing={3}
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setConfirmOpen(true);
                    }}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Title"
                                slotProps={{ inputLabel: { shrink: true } }}
                                fullWidth
                                {...field}
                                error={!!errors.title}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Description (Markdown)"
                                slotProps={{ inputLabel: { shrink: true } }}
                                fullWidth
                                multiline
                                rows={8}
                                {...field}
                                error={!!errors.description}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="type"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Autocomplete
                                options={TYPES}
                                value={field.value || null}
                                onChange={(_, newValue) =>
                                    field.onChange(newValue)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Type"
                                        slotProps={{
                                            inputLabel: { shrink: true },
                                        }}
                                        error={!!errors.type}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="difficulty"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                select
                                label="Difficulty"
                                slotProps={{ inputLabel: { shrink: true } }}
                                fullWidth
                                error={!!errors.difficulty}
                                {...field}
                            >
                                <MenuItem value="EASY">Easy</MenuItem>
                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                <MenuItem value="HARD">Hard</MenuItem>
                            </TextField>
                        )}
                    />

                    <Typography variant="h6">Test Cases</Typography>

                    {fields.map((field, index) => {
                        const isDeleted = field.markedForDelete;
                        return (
                            <Stack
                                key={field.id}
                                spacing={1}
                                sx={{ opacity: isDeleted ? 0.5 : 1 }}
                            >
                                <TextField
                                    label={`Input #${index + 1}`}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    {...register(
                                        `testCases.${index}.inputData`,
                                        {
                                            required: true,
                                        }
                                    )}
                                    multiline
                                    disabled={isDeleted}
                                    error={
                                        !!errors.testCases?.[index]?.inputData
                                    }
                                />

                                <TextField
                                    label={`Output #${index + 1}`}
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    {...register(
                                        `testCases.${index}.expectedOutput`,
                                        {
                                            required: true,
                                        }
                                    )}
                                    multiline
                                    disabled={isDeleted}
                                    error={
                                        !!errors.testCases?.[index]
                                            ?.expectedOutput
                                    }
                                />
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {isDeleted && (
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            This test case will be deleted
                                        </Typography>
                                    )}
                                    <IconButton
                                        onClick={() => handleRemove(index)}
                                    >
                                        <Delete
                                            color={
                                                isDeleted ? "error" : "inherit"
                                            }
                                        />
                                    </IconButton>
                                </Box>
                            </Stack>
                        );
                    })}

                    <Button
                        variant="outlined"
                        onClick={() =>
                            append({ inputData: "", expectedOutput: "" })
                        }
                        startIcon={<Add />}
                    >
                        Add Test Case
                    </Button>

                    <Button type="submit" variant="contained">
                        Save Changes
                    </Button>
                </Stack>
            </Paper>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to save the changes to this
                        problem?
                    </DialogContentText>
                    <DialogContentText color="error" variant="caption">
                        This will also permanently delete any removed test
                        cases.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            setConfirmOpen(false);
                            handleSubmit(onSubmit)();
                        }}
                        variant="contained"
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EditProblem;
