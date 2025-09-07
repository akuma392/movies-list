// src/components/Layout.js
import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh", // take full screen height
            })}
        >
            <Header />

            {/* Main Content */}
            <Box component="main" sx={{ flex: 1, p: 2 }}>
                {children}
            </Box>

            <Footer />
        </Box>
    );
};

export default Layout;
