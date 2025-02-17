import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  background: "transparent",
  borderRadius: "30px",
  border: "2px solid white",
  color: "white",
  "&:hover": { backgroundColor: "#00bcd4" },
});

export default StyledButton;
