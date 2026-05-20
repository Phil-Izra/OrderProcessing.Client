import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../auth/useAuthContext";
export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();
  const [anchor, setAnchor] = useState(null);
  const handleSignOut = () => {
    signOut();
    navigate("/login");
    setAnchor(null);
  };
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <ShoppingCartIcon sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Order Engine
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")}>
          Dashboard
        </Button>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button color="inherit" onClick={() => navigate("/orders")}>
              Orders
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/create-order")}
            >
              + New Order
            </Button>
            <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
              <Avatar
                src={user.photoUrl}
                sx={{ width: 36, height: 36, bgcolor: "secondary.main" }}
              >
                {user.fullName?.[0]}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchor}
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
            >
              <MenuItem disabled>
                <Typography variant="body2">{user.fullName}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  setAnchor(null);
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
