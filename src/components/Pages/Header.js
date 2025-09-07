import React, { useContext, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contextApi/ThemeContext";
import { useAuth } from "../contextApi/AuthContext";

const Header = () => {
    const { mode, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const menuItems = user
        ? [
            { text: "Movies", link: "/movies" },
            { text: "TV Series", link: "/tvseries" },
            { text: "Profile", link: "/profile" },
            { text: "Logout", action: logout },
        ]
        : [
            { text: "Movies", link: "/movies" },
            { text: "TV Series", link: "/tvseries" },
            { text: "Signup", link: "/signup" },
        ];

    return (
        <AppBar position="sticky" color={mode === "dark" ? "default" : "primary"} sx={mode === "dark" ? { bgcolor: "black", color: "white" } : ""}>
            <Toolbar>
                <IconButton component={Link} to="/" color="inherit">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Movies App
                </Typography>

                {/* Desktop */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                    {menuItems.map((item, idx) =>
                        item.link ? (
                            <Button key={idx} color="inherit" component={Link} to={item.link}>
                                {item.text}
                            </Button>
                        ) : (
                            <Button key={idx} color="inherit" onClick={item.action}>
                                {item.text}
                            </Button>
                        )
                    )}
                    <IconButton color="inherit" onClick={toggleTheme}>
                        <Brightness4Icon />
                    </IconButton>
                </Box>

                {/* Mobile */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <IconButton color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {menuItems.map((item, idx) =>
                            item.link ? (
                                <MenuItem key={idx} component={Link} to={item.link} onClick={handleClose}>
                                    {item.text}
                                </MenuItem>
                            ) : (
                                <MenuItem key={idx} onClick={() => { item.action(); handleClose(); }}>
                                    {item.text}
                                </MenuItem>
                            )
                        )}
                        <MenuItem onClick={toggleTheme}>Toggle Theme</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
