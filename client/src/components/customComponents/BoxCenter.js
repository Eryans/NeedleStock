import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import "../../scss/centerBox.css";

export default function BoxCenter({ children }) {
  return (
    <Paper className="ctrBox">
      <Box>{children}</Box>
    </Paper>
  );
}
