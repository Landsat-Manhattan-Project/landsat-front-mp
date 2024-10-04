import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode, useState } from "react";

interface Props {}

type menuOption = {
  Name: string;
  Icon: ReactNode;
};

const SideMenu = (props: Props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const options: menuOption[] = [
    { Name: "Home", Icon: <HomeIcon /> },
    { Name: "Saved Locations", Icon: <FmdGoodIcon /> },
    { Name: "Events", Icon: <EventAvailableIcon /> },
    { Name: "Settings", Icon: <SettingsIcon /> },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const OptionsList = () => {
    return (
      <List>
        {options.map((i: menuOption) => (
          <ListItem key={i.Name} disablePadding>
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#222" } }}>
              <ListItemIcon sx={{ color: "#fff" }}>{i.Icon}</ListItemIcon>
              <ListItemText primary={i.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "#000" },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <OptionsList />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideMenu;
