"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, List, ListItem, ListItemText, IconButton, Drawer, useTheme, useMediaQuery, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
      { text: "Profile", href: "/profile" },
      { text: "Products", href: "/add-product-page" },
      { text: "User Management", href: "/edit-user-role-page" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuContent = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          component={Link}
          href={item.href}
          onClick={() => isMobile && setMobileOpen(false)}
          sx={{
            backgroundColor: pathname === item.href ? 
              theme.palette.action.selected : 
              "transparent",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            textDecoration: "none",
            color: theme.palette.text.primary,
            marginBottom: "1rem"
          }}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            position: 'fixed',
            top: '4rem',
            left: 0,
            right: 0,
            height: '3rem',
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            zIndex: 1100,
            gap: 2,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="subtitle1" 
            component="div"
            sx={{ 
              fontWeight: 500,
              color: theme.palette.text.primary,
              flexGrow: 1,
            }}
          >
            Admin options
          </Typography>
        </Box>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              mt: '7rem',
              height: 'calc(100% - 7rem)',
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {menuContent}
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: "250px",
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        minHeight: "100%",
      }}
    >
      {menuContent}
    </Box>
  );
};

export default Sidebar; 