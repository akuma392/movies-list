// SingleMoviePage.jsx
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Chip,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Stack,
    Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useLocation, useParams } from "react-router-dom";

const SingleMoviePage = () => {
    const [movie, setMovie] = useState(null);

    const { movieId } = useParams();
    const location = useLocation();
    useEffect(() => {
        setMovie(location.state?.movie);
        if (!movie) {

            // fetch(`/api/imdb/title/${movieId}`)
            //     .then((res) => res.json())
            //     .then((data) => setMovie(data));
        }
    }, [movie, movieId]);

    console.log(movie, ">>>>>>>>>>");

    if (!movie) return <p>Loading...</p>;

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Grid container spacing={4}>
                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardMedia
                            component="img"
                            image={movie.primaryImage}
                            alt={movie.primaryTitle}
                            sx={{
                                width: "100%",
                                maxHeight: 500,
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                    </Card>

                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: "bold", mb: 2 }}
                    >
                        {movie.primaryTitle}
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        color="text.secondary"
                        sx={{ mb: 2, fontStyle: "italic" }}
                    >
                        {movie.originalTitle}
                    </Typography>

                    <Typography
                        variant="body1"
                        align="justify"
                        sx={{ mb: 3, lineHeight: 1.7 }}
                    >
                        {movie.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                        <Chip label={`Rating: ${movie.averageRating}`} color="primary" />
                        <Chip label={`Runtime: ${movie.runtimeMinutes} min`} />
                        <Chip label={`Release: ${movie.releaseDate}`} />
                        <Chip label={`Votes: ${movie.numVotes}`} />
                        <Button
                            variant="contained"
                            color="primary"
                            href={movie.trailer}
                            target="_blank"
                        >
                            Watch Trailer
                        </Button>
                    </Stack>

                    {/* Thumbnails */}
                    <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
                        Thumbnails
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                        {movie.thumbnails.map((thumb, idx) => (
                            <Card
                                key={idx}
                                sx={{
                                    width: { xs: 120, sm: 160 },
                                    borderRadius: 2,
                                    boxShadow: 2,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={thumb.url}
                                    alt={`Thumbnail ${idx + 1}`}
                                    sx={{ borderRadius: 2 }}
                                />
                            </Card>
                        ))}
                    </Stack>

                </Grid>

                {/* Side Section (only on large screens, but collapses below md) */}
                <Grid item xs={12} md={4}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }} // column on small, row on large
                        gap={3} // space between boxes 
                    >
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                boxShadow: { md: 2, xs: 0 },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
                            >
                                Details
                            </Typography>

                            {/* Genres */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Genres
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                {movie.genres.map((g, idx) => (
                                    <Chip key={idx} label={g} variant="outlined" />
                                ))}
                            </Stack>

                            {/* Interests */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Interests
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                {movie.interests.map((i, idx) => (
                                    <Chip key={idx} label={i} color="secondary" />
                                ))}
                            </Stack>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Countries Of Origin
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                {movie.countriesOfOrigin.map((i, idx) => (
                                    <Chip key={idx} label={i} color="info" />
                                ))}
                            </Stack>

                            <Divider sx={{ my: 1 }} />

                        </Box>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                boxShadow: { md: 2, xs: 0 },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
                            >
                                Details
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Filming Locations
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                                {movie.filmingLocations.map((g, idx) => (
                                    <Chip key={idx} label={g} variant="outlined" />
                                ))}
                            </Stack>

                            {/* Production Companies */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                Production Companies
                            </Typography>
                            {movie.productionCompanies.map((pc, idx) => (
                                <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                                    {pc.name}
                                </Typography>
                            ))}

                            <Divider sx={{ my: 1 }} />

                            {/* External Links */}
                            {movie.externalLinks.length > 0 && (
                                <>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 600, mb: 1 }}
                                    >
                                        External Links
                                    </Typography>
                                    {movie.externalLinks.map((link, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="body2"
                                            component="a"
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                display: "block",
                                                mb: 0.5,
                                                color: "primary.main",
                                                textDecoration: "none",
                                                "&:hover": { textDecoration: "underline" },
                                            }}
                                        >
                                            {link}
                                        </Typography>
                                    ))}
                                </>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

};

export default SingleMoviePage;
