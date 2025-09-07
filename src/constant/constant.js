const BASE_URL = "https://imdb236.p.rapidapi.com/api/imdb/";

const categories = [
    { label: "Top 250 Movies", value: "top250-movies" },
    { label: "Most Popular Movies", value: "most-popular-movies" },
    { label: "Top Rated English Movies", value: "top-rated-english-movies" },
    { label: "Trending Tamil", value: "trending-tamil", country: "india" },
    { label: "Trending Telugu", value: "trending-telugu", country: "india" },
    { label: "Top Rated Tamil Movies", value: "top-rated-tamil-movies", country: "india" },
    { label: "Top Rated Telugu Movies", value: "top-rated-telugu-movies", country: "india" },
    { label: "Top Rated Malayalam Movies", value: "top-rated-malayalam-movies", country: "india" },
    { label: "Top Rated Indian Movies", value: "top-rated-indian-movies", country: "india" },
];

export { BASE_URL, categories };