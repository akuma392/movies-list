import React, { useState, useEffect } from "react";
import {
    Grid, Container, Pagination, Box
    , Typography, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import MovieCard from "./MovieCards";
import { fetchData, getFullUrl } from "../../utils/apiUtility";
import Loader from "../common/Loader";
import LocalStorageUtil from "../../utils/LocalStorageUtil";
import { categories, } from "../../constant/constant";

// const sampleMovies = [
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BNTE3OTIxZDYtNjA0NC00N2YxLTg1NGQtOTYxNmZkMDkwOWNjXkEyXkFqcGc@.jpg" },
//     { title: "Inception", plot: "A mind-bending thriller", imdb: "8.8", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
//     { title: "The Matrix", plot: "Reality vs Simulation", imdb: "8.7", image: "https://m.media-amazon.com/images/M/MV5BMjExYTY3YTUtZDQzOC00NTVmLWFhOWQtMGI5ZWUxYTY0MjgyXkEyXkFqcGc@.jpg" },
// ];

const Movies = () => {
    const [selectedCard, setSelectedCard] = useState(0);
    const [sampleMovies, setSampleMovies] = useState([]);
    const [category, setCategory] = useState("top250-movies");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const itemsPerPage = 8;
    const totalPages = Math.ceil(sampleMovies.length / itemsPerPage);

    // Slice movies for current page
    const currentMovies = sampleMovies.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleChange = (event, value) => {
        setPage(value);
    };


    useEffect(() => {
        setLoading(true);
        const cacheKey = `movies_${category}`;

        const getMovies = async () => {
            const selectedCategory = categories.find(cat => cat.value === category);

            const url = selectedCategory.country ? getFullUrl(`${selectedCategory?.country}/${category}`) : getFullUrl(category);
            const movies = await fetchData(url, cacheKey, 48 * 60 * 60 * 1000);
            setSampleMovies(movies);
            setLoading(false);
        };
        getMovies();
        setPage(1); // Reset to first page on category change
    }, [category]);


    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>

            <Typography variant="h4" gutterBottom>
                Movies
            </Typography>

            {/* Category Dropdown */}
            <FormControl sx={{ mb: 3, minWidth: 250 }} size="small">
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    label="Select Category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                            {cat.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading ? <Loader /> :
                <>
                    <Grid container spacing={3} justifyContent="center">
                        {currentMovies.map((movie, idx) => (
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

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChange}
                            color="secondary"
                            // size="small"
                            shape="rounded"
                            variant="outlined"
                        />
                    </Box>
                </>
            }
        </Container>
    );
};

export default Movies;
