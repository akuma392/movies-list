import React, { useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Button,
    Paper,
    Modal,
    TextField,
    Grid,
    Card,
    CardContent,
    Chip,
    Snackbar,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../contextApi/AuthContext";

const Profile = () => {
    // Mock user (replace with useAuth later)
    const user = {
        name: "John Doe",
        email: "test@example.com",
    };
    const logout = () => { };

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        username: user.name,
        password: "",
        photo: "",
    });

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
    });

    // Example Watchlist
    const [watchlist, setWatchlist] = useState([
        { title: "Inception", isCompleted: true, ott: "Netflix" },
        { title: "The Matrix", isCompleted: false, ott: "Amazon Prime" },
        { title: "Interstellar", isCompleted: true, ott: "Disney+" },
    ]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0].name : value,
        }));
    };

    const handleUpdate = () => {
        console.log("Updated profile:", form);
        handleClose();
    };

    // Toggle movie completion
    const toggleCompletion = (idx) => {
        setWatchlist((prev) =>
            prev.map((movie, i) =>
                i === idx ? { ...movie, isCompleted: !movie.isCompleted } : movie
            )
        );

        const updatedMovie = watchlist[idx];
        setSnackbar({
            open: true,
            message: `${updatedMovie.title} marked as ${updatedMovie.isCompleted ? "Pending" : "Completed"
                }`,
        });
    };

    // Snackbar close
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbar({ ...snackbar, open: false });
    };

    if (!user) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h6">You are not logged in.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Profile Info */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                <Paper
                    sx={{
                        p: 4,
                        width: 400,
                        textAlign: "center",
                        borderRadius: 3,
                        boxShadow: 4,
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 80,
                            height: 80,
                            fontSize: "2rem",
                            mx: "auto",
                            mb: 2,
                        }}
                    >
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </Avatar>

                    <Typography variant="h5" gutterBottom>
                        {user.name || "Unknown User"}
                    </Typography>

                    {user.email && (
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            gutterBottom
                        >
                            {user.email}
                        </Typography>
                    )}

                    <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
                        <Button variant="contained" onClick={handleOpen}>
                            Edit Profile
                        </Button>
                        <Button variant="outlined" color="error" onClick={logout}>
                            Logout
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Watchlist */}
            <Typography variant="h6" gutterBottom>
                My Watchlist
            </Typography>
            <Grid container spacing={2}>
                {watchlist.map((movie, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Card sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                                <Chip
                                    label={movie.isCompleted ? "Completed" : "Pending"}
                                    color={movie.isCompleted ? "success" : "warning"}
                                    size="small"
                                    sx={{ mt: 1, mr: 1 }}
                                />
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Available on: {movie.ott}
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ mt: 2 }}
                                    onClick={() => toggleCompletion(idx)}
                                >
                                    Mark as {movie.isCompleted ? "Pending" : "Completed"}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Edit Profile Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Edit Profile
                    </Typography>
                    <TextField
                        label="Update Username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Update Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
                        Upload Photo
                        <input
                            type="file"
                            hidden
                            name="photo"
                            onChange={handleChange}
                        />
                    </Button>
                    {form.photo && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Selected: {form.photo}
                        </Typography>
                    )}
                    <Button variant="contained" fullWidth onClick={handleUpdate}>
                        Update
                    </Button>
                </Box>
            </Modal>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                message={snackbar.message}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </Box>
    );
};

export default Profile;
