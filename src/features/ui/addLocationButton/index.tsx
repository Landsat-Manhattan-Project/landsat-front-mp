import { Box, IconButton, ThemeProvider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {};

const AddLocationButton = (props: Props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0",
        right: "10rem",
        backgroundColor: "#000",
      }}
    >
      <IconButton size="large" edge="start" color="inherit" aria-label="menu">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default AddLocationButton;
