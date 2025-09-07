// import React from "react";
// import { Box, Typography } from "@mui/material";

// const Footer = () => {
//     return (
//         <Box sx={{ textAlign: "center", py: 2 }}>
//             <Typography variant="body2">© 2025 Movies App</Typography>
//         </Box>
//     );
// };

// export default Footer;

// src/components/Pages/Footer.js
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contextApi/ThemeContext";

const Footer = () => {
    const { mode } = useContext(ThemeContext); // kept in case you want to change behavior later

    return (
        <AppBar
            position="static"
            elevation={3}
            color={mode === "dark" ? "default" : "primary"}
            sx={mode === "dark" ? { bgcolor: "black", color: "white" } : ""}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    // stack on small screens, row on md+
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    py: { xs: 2, md: 1 },
                }}
            >
                {/* Links: centered on small screens, left aligned on md+ */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: { xs: "center", md: "flex-start" },
                        width: { xs: "100%", md: "auto" },
                    }}
                >
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                        startIcon={<HomeIcon />}
                        sx={{ textTransform: "none" }}
                        aria-label="Go to Home"
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/profile"
                        color="inherit"
                        startIcon={<PersonIcon />}
                        sx={{ textTransform: "none" }}
                        aria-label="Go to Profile"
                    >
                        Profile
                    </Button>
                </Box>

                {/* Footer text: centered on small screens */}
                <Typography
                    variant="body2"
                    sx={{
                        textAlign: "center",
                        width: { xs: "100%", md: "auto" },
                        mt: { xs: 0, md: 0 },
                    }}
                >
                    © {new Date().getFullYear()} My Movie App
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
