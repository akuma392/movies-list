import React, { useContext } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Chip, Divider, CardActionArea } from "@mui/material";
import { ThemeContext } from "../contextApi/ThemeContext";

const MovieCard = ({ movie, selectedCard, setSelectedCard, index }) => {
    const { mode } = useContext(ThemeContext);
    const { description, primaryTitle } = movie;
    const shortDescription = description.split(' ').length > 50 ? description.split(' ').slice(0, 50).join(' ') + '...' : description;
    const shortTitle = primaryTitle.length > 20 ? primaryTitle.slice(0, 20) + '...' : primaryTitle;


    return (
        <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            {/* <CardActionArea
                // onClick={() => setSelectedCard(index)}
                // data-active={selectedCard === index ? '' : undefined}
                sx={{
                    height: '100%',
                    '&[data-active]': {
                        // backgroundColor: 'action.selected',
                        '&:hover': {
                            backgroundColor: 'action.selectedHover',
                        },
                    },
                }}
            > */}
            <CardMedia
                component="img"
                height="250"
                image={movie.primaryImage}
                alt={movie.primaryTitle}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom color="textPrimary">
                    {shortTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
                    {shortDescription}
                </Typography>
                <Typography variant="subtitle2" color="warning" sx={{ mb: 1 }}>
                    Release date: {movie.releaseDate}
                </Typography>
                <Divider />
                <Typography variant="body2" sx={{ mt: 1 }} align="justify">
                    {/* IMDB: {movie.imdb} */}
                    <Chip label={`IMDB: ${movie.averageRating}`} color={mode === "dark" ? "default" : "primary"} variant={mode === "dark" ? "filled" : "outlined"} size="small" sx={{ mr: 2 }} />
                    <Button size="small" variant="contained" sx={{ ml: 2 }} color={mode === "dark" ? "info" : "primary"}>
                        See More
                    </Button>
                </Typography>


            </CardContent>
            {/* </CardActionArea> */}
        </Card>
    );
};

export default MovieCard;
