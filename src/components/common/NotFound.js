import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NotFound = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                textAlign: "center",
                p: 3,
            }}
        >
            <Typography variant="h3" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ mt: 2 }}
            >
                Back to Home
            </Button>
        </Box>
    );
};

export default NotFound;
