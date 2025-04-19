import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

// Pages (if needed later)
// import Supplier from "../pages/Dashboard/Supplier";

const pages = ["Home","Supplier", "WareHouse"];
const settings = ["Profile", "Dashboard", "Logout"];

const NavBar = ({ user }) => {
  const navigate = useNavigate();
  const [page,setPage]=useState("Home");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavClick = (page) => {
    setAnchorElNav(null);
    if (page === "Supplier") navigate("/supplier");
    else if (page === "WareHouse") navigate("/WareHouse");
    else if (page === "Home") navigate("/Home");
  };

  const handleMenuClick = (setting) => {
    setAnchorElUser(null);
    if (setting === "Profile") navigate("/profile");
    else if (setting === "Dashboard") navigate("/Home");
    else if (setting === "Logout") {
      navigate("/sign-in");
      console.log("Logging Out...");
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e2939" }}>
  <Toolbar disableGutters sx={{ px: 0, mx: 0, minHeight: "64px !important" }}>
    {/* Logo + Branding */}
    <Box sx={{ display: "flex", alignItems: "center", ml: 2, mr: 2 }}>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BI-Dashboard
      </Typography>
    </Box>

    {/* Mobile Menu */}
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} value={page} onClose={handleCloseNavMenu}>
        {pages.map((page) => (
          <MenuItem key={page}  onClick={() => handleNavClick(page)}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>

    {/* Desktop Menu */}
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((p) => (
        <Button value={p} key={p} sx={{ my: 2, color: "white" }} onClick={() =>{ handleNavClick(p); setPage(p);}} 
          sx={{
          my: 2,
          color: page === p ? "#1e88e5" : "white", // active is blue, rest are white
          fontWeight: page === p ? 700 : 400,
          borderBottom: page === p ? "2px solid #1e88e5" : "none",
          borderRadius: 0,
        }}>
        
  
          {p}
        </Button>
      ))}
    </Box>

    {/* Avatar */}
    <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", mr: 2 }}>
      <Typography sx={{ color: "white", mr: 2, fontWeight: 500 }}>
        {user.firstName} {user.lastName}
      </Typography>
      {/* <Tooltip title="Open settings"> */}
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: "#1e88e5" }}>
            {user.firstName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      {/* </Tooltip> */}
    </Box>
  </Toolbar>
</AppBar>

  
  
  );
};

export default NavBar;
