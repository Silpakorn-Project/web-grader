import { TYPES } from "@/constants/common"; // Ensure TYPES is a string[]
import { client } from "@/services";
import { Add, Delete } from "@mui/icons-material";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    IconButton,
    MenuItem,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type FormValues = {
    title: string;
    description: string;
    difficulty: string;
    type: string;
    testCases: { inputData: string; expectedOutput: string }[];
};

const CreateProblem: FC = () => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            difficulty: "Easy",
            type: "Math",
            testCases: [{ inputData: "", expectedOutput: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "testCases",
    });

    const { mutateAsync: createProblemMutation } = useMutation({
        mutationFn: client.graderService.problems.createProblem,
    });

    const { mutateAsync: createTestCasesMutation } = useMutation({
        mutationFn: client.graderService.testCase.createTestcases,
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<
        "success" | "error"
    >("success");

    const onSubmit = async (data: FormValues) => {
        try {
            const { data: problemId } = await createProblemMutation({
                title: data.title,
                description: data.description,
                difficulty: data.difficulty,
                type: data.type,
            });

            await createTestCasesMutation({
                problemId: problemId,
                testcases: data.testCases,
            });

            setSnackbarMessage("Problem created successfully!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage("An error occurred while creating the problem.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper sx={{ p: 4, width: "100%", maxWidth: 700 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Problem
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <TextField
                            label="Title"
                            fullWidth
                            {...register("title", { required: true })}
                            error={!!errors.title}
                        />

                        <TextField
                            label="Description (Markdown)"
                            fullWidth
                            multiline
                            rows={8}
                            {...register("description", { required: true })}
                            error={!!errors.description}
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
                                            error={!!errors.type}
                                        />
                                    )}
                                />
                            )}
                        />

                        <TextField
                            select
                            label="Difficulty"
                            defaultValue="Easy"
                            fullWidth
                            {...register("difficulty", { required: true })}
                            error={!!errors.difficulty}
                        >
                            <MenuItem value="Easy">Easy</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Hard">Hard</MenuItem>
                        </TextField>

                        <Typography variant="h6">Test Cases</Typography>
                        {fields.map((field, index) => (
                            <Stack key={field.id} spacing={1}>
                                <TextField
                                    label={`Input #${index + 1}`}
                                    {...register(
                                        `testCases.${index}.inputData`,
                                        { required: true }
                                    )}
                                    multiline
                                    error={
                                        !!errors.testCases?.[index]?.inputData
                                    }
                                />
                                <TextField
                                    label={`Output #${index + 1}`}
                                    {...register(
                                        `testCases.${index}.expectedOutput`,
                                        { required: true }
                                    )}
                                    multiline
                                    error={
                                        !!errors.testCases?.[index]
                                            ?.expectedOutput
                                    }
                                />
                                <Box display="flex" justifyContent="flex-end">
                                    <IconButton
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Stack>
                        ))}

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
                            Submit
                        </Button>
                    </Stack>
                </form>
            </Paper>

            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateProblem;
