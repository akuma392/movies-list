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
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../contextApi/AuthContext";
import { ThemeContext } from "../contextApi/ThemeContext";

const Login = () => {
    const { login } = useAuth();
    const { mode } = useContext(ThemeContext);
    const [form, setForm] = useState({ username: "", password: "" });

    const handleSubmit = () => {
        login(form.username);
    };

    console.log(">>>>>>>>>>", mode);

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
                Login
            </Typography>

            {/* Username / Email */}
            <TextField
                label="Username / Email"
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

            {/* Login Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSubmit}
                color={mode === "dark" ? "info" : "primary"}
            >
                Login
            </Button>

            {/* Google Login */}
            <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<GoogleIcon />}
            // color="error"
            >
                Login with Google
            </Button>

            {/* Link to Signup */}
            <Typography sx={{ mt: 2, textAlign: "center" }}>
                New here?{" "}
                <Link href="/signup" underline="hover">
                    Signup
                </Link>
            </Typography>
        </Box>
    );
};

export default Login;
