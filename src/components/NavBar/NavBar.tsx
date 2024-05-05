import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import styles from './NavBar.module.scss';
import { useSession } from "@/app/session-content";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { setUserToken } = useSession();
  const router = useRouter();

  const onLogout = () => {
    setUserToken(null);
  } 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.root}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NASA API
          </Typography>
          <Button className={styles.loginBtn} color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
