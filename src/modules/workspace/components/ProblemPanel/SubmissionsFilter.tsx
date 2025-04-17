import { LANGUAGE, STATUS } from "@/constants/common";
import { ISubmissionsQueryParams } from "@/services/models/GraderServiceModel";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

type SubmissionsFilterProps = {
    onChange: (params: ISubmissionsQueryParams) => void;
};

const SubmissionsFilter: FC<SubmissionsFilterProps> = ({ onChange }) => {
    const [status, setStatus] = useState("");
    const [language, setLanguage] = useState("");

    useEffect(() => {
        onChange({ status, language });
    }, [status, language]);

    return (
        <Stack direction="row" spacing={2} width="100%">
            <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                    displayEmpty
                >
                    <MenuItem value="">Status</MenuItem>
                    {STATUS.map((status) => (
                        <MenuItem key={status} value={status}>
                            {status}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
                <InputLabel>Language</InputLabel>
                <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label="Language"
                    displayEmpty
                >
                    <MenuItem value="">Language</MenuItem>
                    {LANGUAGE.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default SubmissionsFilter;
