import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBar: React.FC = () => {
  const { username, role, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdmin = role === "ADMIN";

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "white",
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          Content Portal
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {!username && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{
                  border: "1px solid rgba(255,255,255,0.6)",
                  borderRadius: "8px",
                }}
              >
                Register
              </Button>
            </>
          )}

          {username && (
            <>
              <Button color="inherit" component={Link} to="/my-content">
                My Content
              </Button>

              {isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin Panel
                </Button>
              )}

              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 500 }}
              >
                Logout ({username})
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMenuOpen}
            aria-controls={isMenuOpen ? "menu-appbar" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            keepMounted
          >
            {!username && [
              <MenuItem
                key="login"
                component={Link}
                to="/login"
                onClick={handleMenuClose}
              >
                Login
              </MenuItem>,
              <MenuItem
                key="register"
                component={Link}
                to="/register"
                onClick={handleMenuClose}
              >
                Register
              </MenuItem>,
            ]}

            {username && [
              <MenuItem
                key="my-content"
                component={Link}
                to="/my-content"
                onClick={handleMenuClose}
              >
                My Content
              </MenuItem>,
              isAdmin && (
                <MenuItem
                  key="admin-panel"
                  component={Link}
                  to="/admin"
                  onClick={handleMenuClose}
                >
                  Admin Panel
                </MenuItem>
              ),
              <MenuItem
                key="logout"
                onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}
              >
                Logout ({username})
              </MenuItem>,
            ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
