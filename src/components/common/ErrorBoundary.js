import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        minHeight: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "background.default",
                        color: "text.primary",
                        textAlign: "center",
                        p: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Oops! Something went wrong.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        An unexpected error occurred. Please try again.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/"
                        sx={{ mt: 2 }}
                    >
                        Go Home
                    </Button>
                </Box>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
