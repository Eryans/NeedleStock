import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import "../../scss/centerBox.css";
import { Container } from "@mui/material";

export default function BoxCenter({ children }) {
  return (
    <Container className="ctnBox" style={{display:"flex"}}>
    <Paper className="ctrBox" sx={{padding:"1em"}}>
      <Box>{children}</Box>
    </Paper>
    </Container>
  );
}
