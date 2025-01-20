import DescriptionIcon from "@mui/icons-material/Description";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";

type ProblemDescriptionProps = {};

const ProblemDescription: React.FC<ProblemDescriptionProps> = () => {
    return (
        <Box bgcolor={"#2d2d2d"} overflow={"auto"}>
            <AppBar position="sticky">
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{ minHeight: 40, height: 40, padding: 1 }}
                >
                    <Button
                        startIcon={<DescriptionIcon />}
                        size="small"
                        color="inherit"
                        variant="contained"
                    >
                        Description
                    </Button>
                </Toolbar>
            </AppBar>

            <Box p={2}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
        </Box>
    );
};

const content = `
# Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

## Example 1:

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

## Example 2:

\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

## Constraints:

* 2 <= nums.length <= 104
* -109 <= nums[i] <= 109
* -109 <= target <= 109
* Only one valid answer exists.
`;

export default ProblemDescription;
