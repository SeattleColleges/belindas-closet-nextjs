"use client";
import { Typography, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleListItemClick = (index: SetStateAction<number>) => {
    setSelectedItem(index);
  };

  const drawerContent = (
    <div>
      <List sx={{ marginTop: '56px' }}>
        <ListItem
          sx={{ backgroundColor: selectedItem === 0 ? 'green' : 'white' }}
          onClick={() => handleListItemClick(0)}
        >
          <ListItemText primary="Activity" />
        </ListItem>
        <ListItem
          sx={{ backgroundColor: selectedItem === 1 ? 'green' : 'white' }}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemText primary="History" />
        </ListItem>
        <ListItem
          sx={{ backgroundColor: selectedItem === 2 ? 'green' : 'white' }}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemText primary="Week Activity" />
        </ListItem>
        <ListItem
          sx={{ backgroundColor: selectedItem === 3 ? 'green' : 'white' }}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem
          sx={{ backgroundColor: selectedItem === 4 ? 'green' : 'white' }}
          onClick={() => handleListItemClick(4)}
        >
          <ListItemText primary="Activity" />
        </ListItem>
        {/* Add more list items as needed */}
      </List>
    </div>
  );

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if ((userRole === "admin" || userRole === "creator")) {
    return (
      <div>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          {drawerContent}
        </Drawer>
        <IconButton onClick={handleDrawerToggle} sx={{ position: 'fixed', top: '80px', left: '16px' }}>
          {drawerOpen ? <MenuIcon sx={{ color: "black" }} /> : <MenuIcon sx={{ color: "black" }} />}
        </IconButton>
        <Typography
          component="h1"
          variant="h3"
          sx={{ color: "white", marginLeft: drawerOpen ? 240 : 0, mt: 3 }}
        >
          Dashboard
        </Typography>
        {/* Add your dashboard content here */}
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />;
  };
};

export default Dashboard;