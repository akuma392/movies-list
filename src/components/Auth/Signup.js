import React, { useState, useContext } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ThemeContext } from "../contextApi/ThemeContext";

const Signup = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const { mode } = useContext(ThemeContext);

    const handleSignup = () => {
        console.log("User Registered:", form);
        // later connect this with AuthContext or backend API
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 6,
                p: 4,
                boxShadow: 4,
                borderRadius: 3,
                bgcolor: "background.paper",
            }}
        >
            <Typography variant="h5" mb={3} align="center">
                Signup
            </Typography>

            {/* Username */}
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Email */}
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Password */}
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Signup Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSignup}
                color={mode === "dark" ? "info" : "primary"}
            >
                Signup
            </Button>

            {/* Link to Login */}
            <Typography sx={{ mt: 2, textAlign: "center" }} >
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                    Login
                </Link>
            </Typography>
        </Box>
    );
};

export default Signup;
