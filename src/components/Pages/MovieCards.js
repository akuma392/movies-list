import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Divider,
    CardActionArea,
    IconButton,
    Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../contextApi/ThemeContext";

const MovieCard = ({ movie, selectedCard, setSelectedCard, index }) => {
    const { mode } = useContext(ThemeContext);
    const { description, primaryTitle } = movie;
    const navigate = useNavigate();

    const shortDescription =
        description?.split(" ").length > 50
            ? description.split(" ").slice(0, 50).join(" ") + "..."
            : description;

    const shortTitle =
        primaryTitle.length > 20
            ? primaryTitle.slice(0, 20) + "..."
            : primaryTitle;

    // State for favorites
    const [isFavorite, setIsFavorite] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const handleFavoriteToggle = () => {
        const newState = !isFavorite;
        setIsFavorite(newState);

        setSnackbarMsg(
            newState
                ? `Added "${primaryTitle}" to favorites`
                : `Removed "${primaryTitle}" from favorites`
        );
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    const handleSeeMore = () => {
        navigate(`/movies/${movie.id}`, { state: { movie } });
    };

    return (
        <>
            <Card
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                <CardActionArea
                    sx={{
                        height: "100%",
                        "&[data-active]": {
                            "&:hover": {
                                backgroundColor: "action.selectedHover",
                            },
                        },
                    }}
                >
                    {/* Movie Poster */}
                    <CardMedia
                        component="img"
                        height="250"
                        image={movie.primaryImage}
                        alt={primaryTitle}
                    />

                    {/* Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom color="textPrimary">
                            {shortTitle}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            {shortDescription}
                        </Typography>
                        <Typography variant="subtitle2" color="warning" sx={{ mb: 1 }}>
                            Release date: {movie.releaseDate}
                        </Typography>
                        <Divider />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                            <Chip
                                label={`IMDB: ${movie.averageRating}`}
                                color={mode === "dark" ? "default" : "primary"}
                                variant={mode === "dark" ? "filled" : "outlined"}
                                size="small"
                            />
                            <Button
                                size="small"
                                variant="contained"
                                color={mode === "dark" ? "info" : "primary"}
                                onClick={handleSeeMore}
                            >
                                See More
                            </Button>
                            <IconButton onClick={handleFavoriteToggle} size="small">
                                {isFavorite ? (
                                    <FavoriteIcon color="error" />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMsg}
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
        </>
    );
};

export default MovieCard;
