import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Typography,
    Container,
    TextField,
    List,
    ListItem,
    ListItemText,
    Grid
} from "@mui/material";
import { fetchData, getFullUrl } from "../../utils/apiUtility";
import debounce from "../../utils/debounce";
import MovieCard from "./MovieCards";

const Home = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedCard, setSelectedCard] = useState(0);

    // Debounced search function
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

    return (
        <div>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        // minHeight: "10vh",
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 3,
                        mb: 4,
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Welcome to Movies App
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Search and explore your favorite movies
                    </Typography>

                    {/* Search Input */}
                    <TextField
                        label="Search Movies"
                        variant="outlined"
                        fullWidth
                        value={query}
                        onChange={handleSearch}
                    />


                </Box>
            </Container>
            <Grid container spacing={3} justifyContent="center">
                {movies?.map((movie, idx) => (
                    <Grid
                        item
                        key={idx}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{
                            flexBasis: { xs: "100%", sm: "45%", md: "30%", lg: "20%" },
                            maxWidth: { xs: "100%", sm: "45%", md: "30%", lg: "20%" },
                        }}
                    >
                        <MovieCard
                            movie={movie}
                            selectedCard={selectedCard}
                            setSelectedCard={setSelectedCard}
                            index={idx}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
