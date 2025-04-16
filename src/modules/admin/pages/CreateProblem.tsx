import { TYPES } from "@/constants/common";
import { client } from "@/services";
import { useSnackbarStore } from "@/store/SnackbarStore";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import {
    Autocomplete,
    Box,
    Button,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type TestCase = {
    inputData: string;
    expectedOutput: string;
};

type FormValues = {
    title: string;
    description: string;
    difficulty: string;
    type: string;
    testCases: { inputData: string; expectedOutput: string }[];
    jsonTestCases: string;
};

const CreateProblem: FC = () => {
    const [inputMode, setInputMode] = useState<"manual" | "json">("manual");

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
            jsonTestCases: "",
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

    const { showSnackbar } = useSnackbarStore();

    const onSubmit = async (data: FormValues) => {
        try {
            let testCases: TestCase[] = [];

            if (inputMode === "manual") {
                testCases = data.testCases;
            } else {
                try {
                    const parsed = JSON.parse(data.jsonTestCases);
                    if (
                        !Array.isArray(parsed) ||
                        !parsed.every(
                            (tc) =>
                                typeof tc.inputData === "string" &&
                                typeof tc.expectedOutput === "string"
                        )
                    ) {
                        throw new Error();
                    }
                    testCases = parsed;
                } catch {
                    showSnackbar(
                        "Invalid JSON format for test cases.",
                        "error"
                    );
                    return;
                }
            }

            const { data: problemId } = await createProblemMutation({
                title: data.title,
                description: data.description,
                difficulty: data.difficulty,
                type: data.type,
            });

            await createTestCasesMutation({
                problemId,
                testcases: testCases,
            });

            showSnackbar("Problem created successfully!", "success");
        } catch (error) {
            showSnackbar(
                "An error occurred while creating the problem.",
                "error"
            );
        }
    };

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper sx={{ p: 4, width: "100%", maxWidth: 700 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Problem
                </Typography>
                <Stack
                    spacing={3}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
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

                    <ToggleButtonGroup
                        value={inputMode}
                        exclusive
                        onChange={(_, val) => val && setInputMode(val)}
                        fullWidth
                    >
                        <ToggleButton value="manual">Manual Input</ToggleButton>
                        <ToggleButton value="json">JSON Input</ToggleButton>
                    </ToggleButtonGroup>

                    {inputMode === "manual" ? (
                        <>
                            {fields.map((field, index) => (
                                <Stack key={field.id} spacing={1}>
                                    <TextField
                                        label={`Input #${index + 1}`}
                                        {...register(
                                            `testCases.${index}.inputData`,
                                            {
                                                required: true,
                                            }
                                        )}
                                        multiline
                                        error={
                                            !!errors.testCases?.[index]
                                                ?.inputData
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
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                    >
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
                                    append({
                                        inputData: "",
                                        expectedOutput: "",
                                    })
                                }
                                startIcon={<Add />}
                            >
                                Add Test Case
                            </Button>
                        </>
                    ) : (
                        <TextField
                            label="Test Cases (JSON Format)"
                            {...register("jsonTestCases", {
                                required: inputMode === "json",
                            })}
                            error={!!errors.jsonTestCases}
                            fullWidth
                            multiline
                            rows={8}
                            placeholder={`Example:\n[\n  {\n    "inputData": "3\\n5",\n    "expectedOutput": "8"\n  }\n]`}
                        />
                    )}

                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default CreateProblem;
