import React, { useState, useEffect, useCallback, useContext } from "react";
import {
    Box,
    TextField,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
    Stack,
} from "@mui/material";
import { ThemeContext } from "../contextApi/ThemeContext";
import debounce from "../../utils/debounce";
import { fetchData, getFullUrl } from "../../utils/apiUtility";

// Dummy fetch function (replace with real API call)
const mockData = [
    {
        title: "Queen of Tears",
        year: "2024",
        country: "in",
        options: {
            stream: [
                {
                    provider: "Netflix",
                    option: "Stream",
                    pricing: "1 Season HD ",
                    providerUrl: "https://www.netflix.com/title/81707950",
                },
            ],
        },
    },
    {
        title: "Queen of the South",
        year: "2016",
        country: "in",
        options: {
            stream: [
                {
                    provider: "Netflix",
                    option: "Stream",
                    pricing: "5 Seasons HD ",
                    providerUrl: "https://www.netflix.com/title/80107369",
                },
            ],
        },
    },
    {
        title: "Queen",
        year: "2014",
        country: "in",
        options: {
            stream: [
                {
                    provider: "EPIC ON",
                    option: "Stream",
                    pricing: "Subs HD ",
                    providerUrl: "https://www.epicon.in/movies/queen",
                },
                {
                    provider: "VI movies and tv",
                    option: "Stream",
                    pricing: "Subs",
                    providerUrl: "https://moviesandtv.myvi.in/movie/queen-1",
                },
            ],
            rent: [
                {
                    provider: "Apple TV",
                    option: "Rent",
                    pricing: "₹129.00 HD",
                    providerUrl:
                        "https://tv.apple.com/in/movie/queen/umc.cmc.6llfe33ltrg6mczd2u7k5eakd",
                },
            ],
            buy: [
                {
                    provider: "Apple TV",
                    option: "Buy",
                    pricing: "₹199.00 HD",
                    providerUrl:
                        "https://tv.apple.com/in/movie/queen/umc.cmc.6llfe33ltrg6mczd2u7k5eakd",
                },
            ],
        },
    },
    {
        "title": "Queen of the Universe",
        "year": "2021",
        "country": "in",
        "options": {}
    },
    {
        "title": "Vagrant Queen",
        "year": "2020",
        "country": "in",
        "options": {}
    }
];

const WhereToWatch = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const mode = useContext(ThemeContext);
    const debouncedSearch = useCallback(
        debounce(async (searchTerm) => {
            if (!searchTerm) {
                setMovies([]);
                return;
            }

            const searchUrl = getFullUrl(`autocomplete?query=${searchTerm}`);
            const data = await fetchData(searchUrl, searchTerm);

            if (data) {
                setMovies(data); // assuming "d" contains list of results
            }
        }, 500),
        []
    );

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    useEffect(() => {
        setMovies(mockData)
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            {/* Search Bar */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <TextField
                    variant="outlined"
                    label="Search Movie"
                    value={query}
                    onChange={handleSearch}
                    fullWidth
                    sx={{ maxWidth: 600 }}
                />
            </Box>

            {/* Results */}
            <Grid container spacing={3}>
                {movies.length > 0 ? (
                    movies.map((movie, idx) => (
                        <Grid item xs={12} md={6} lg={4} key={idx}>
                            <Card
                                sx={{
                                    height: "100%",
                                    bgcolor: "background.paper",
                                    display: "flex",
                                    flexDirection: "column",
                                    minWidth: 280
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" color={mode === "dark" ? "textPrimary" : "primary"} align="center" gutterBottom>
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body2" color="error" align="center">
                                        {movie.year} • {movie.country.toUpperCase()}
                                    </Typography>

                                    <Divider sx={{ my: 1 }} />

                                    {/* Streaming / Rent / Buy Options */}
                                    {movie.options?.stream || movie.options?.rent || movie.options?.buy ? (
                                        ["stream", "rent", "buy"].map(
                                            (type) =>
                                                movie.options[type] && (
                                                    <Box key={type} sx={{ mb: 1 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                fontWeight: "bold",
                                                                mb: 1,
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            {type}
                                                        </Typography>
                                                        <Stack spacing={1}>
                                                            {movie.options[type].map((opt, i) => (
                                                                <Box>
                                                                    <Chip
                                                                        key={i}
                                                                        label={`${opt.provider}`}
                                                                        component="a"
                                                                        href={opt.providerUrl}
                                                                        target="_blank"
                                                                        clickable
                                                                        size="small"
                                                                        color={
                                                                            type === "stream"
                                                                                ? "primary"
                                                                                : type === "rent"
                                                                                    ? "warning"
                                                                                    : "success"
                                                                        }
                                                                    />
                                                                    <Chip label={` ${opt.pricing}`} size="small" variant="outlined"
                                                                        color={
                                                                            type === "stream"
                                                                                ? "primary"
                                                                                : type === "rent"
                                                                                    ? "warning"
                                                                                    : "success"
                                                                        }
                                                                        sx={{ ml: 2 }}
                                                                    />
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                )
                                        )
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 1, fontStyle: "italic" }}
                                            align="center"
                                            justifyContent="center"
                                        >
                                            Currently not available in {movie.country.toUpperCase()}
                                        </Typography>
                                    )}
                                </CardContent>
                                {/* <CardActions sx={{ mt: "auto" }}>
                                    <Button
                                        href={movie.options?.stream?.[0]?.providerUrl}
                                        target="_blank"
                                        disabled={!movie.options?.stream?.length}
                                        variant="contained"
                                    >
                                        Watch Now
                                    </Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="text.secondary">
                            {query ? "No results found." : "Search for a movie to begin."}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default WhereToWatch;
