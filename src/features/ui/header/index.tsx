import { AppBar, Box, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { theme } from "../theme";
import { Link } from "react-router-dom";
import SideMenu from "../sideMenu";

type Props = {};

const Header = (props: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <SideMenu />
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" component="div">
                LandFinder
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export { Header };
