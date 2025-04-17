import { TYPES } from "@/constants/common";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Chip,
    FormControl,
    Input,
    InputAdornment,
    Menu,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { FC, useState } from "react";

type ProblemsFilterProps = {
    onChange: (filters: { difficulty?: string; type?: string ; status?: string}) => void;
    selectedFilters: { difficulty?: string; type?: string; status?: string };
};

const ProblemsFilter: FC<ProblemsFilterProps> = ({
    onChange,
    selectedFilters,
}) => {
    const [typeSearch, setTypeSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleTagClick = (selectedType: string) => {
        const newType =
            selectedFilters.type === selectedType ? undefined : selectedType;
        onChange({ ...selectedFilters, type: newType });
    };

    const filteredTypes = TYPES.filter((t) =>
        t.toLowerCase().includes(typeSearch.toLowerCase())
    );

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <Select
                    displayEmpty
                    value=""
                    onChange={(e) =>
                        onChange({
                            ...selectedFilters,
                            status: e.target.value,
                        })
                    }
                    renderValue={() => "Status"}
                >
                    <MenuItem value="Passed">Passed</MenuItem>
                    <MenuItem value="Attempted">Attempted</MenuItem>
                    <MenuItem value="Unattempted">Unattempted</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <Select
                    displayEmpty
                    value=""
                    onChange={(e) =>
                        onChange({
                            ...selectedFilters,
                            difficulty: e.target.value,
                        })
                    }
                    renderValue={() => "Difficulty"}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <Select
                    displayEmpty
                    value=""
                    onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}
                    renderValue={() => "Type"}
                    open={false}
                ></Select>
            </FormControl>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{ paper: { sx: { width: 250, padding: 2 } } }}
            >
                <Box sx={{ paddingX: 1 }}>
                    <Input
                        fullWidth
                        placeholder="Search types"
                        value={typeSearch}
                        onChange={(e) => setTypeSearch(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        py: 2,
                    }}
                >
                    {filteredTypes.length > 0 ? (
                        filteredTypes.map((t) => (
                            <Chip
                                key={t}
                                label={t}
                                color={
                                    t === selectedFilters.type
                                        ? "primary"
                                        : "default"
                                }
                                onClick={() => handleTagClick(t)}
                                sx={{ cursor: "pointer" }}
                            />
                        ))
                    ) : (
                        <Typography sx={{ paddingX: 2, color: "gray" }}>
                            No types found
                        </Typography>
                    )}
                </Box>
            </Menu>
        </Stack>
    );
};

export default ProblemsFilter;
