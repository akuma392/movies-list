import { BASE_URL } from "../constant/constant";
import LocalStorageUtil from "./LocalStorageUtil";

const url = 'https://imdb236.p.rapidapi.com/api/imdb/india/top-rated-indian-movies';
// const search = 'https://imdb236.p.rapidapi.com/api/imdb/autocomplete?query=RRR';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'd9165dc9c9msh07e011ce1852f0fp15391bjsn4e1fdf753492',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
};

function getFullUrl(endpoint) {
    return `${BASE_URL}${endpoint}`;
}

/**
 * Fetch data with caching
 * @param {string} movieUrl - API endpoint (default: top rated Indian movies)
 * @param {string} cacheKey - LocalStorage key (default: "moviesSearch")
 * @param {number} ttl - Time to live in ms (default: 24 hours)
 */

async function fetchData(movieUrl = url, cacheKey = "moviesSearch", ttl = 24 * 60 * 60 * 1000) {
    try {
        const cached = LocalStorageUtil.get(cacheKey);
        if (cached) {
            console.log("Loaded from cache:", cacheKey);
            return cached;
        }
        const response = await fetch(movieUrl, options);
        const result = await response.json();

        LocalStorageUtil.set(cacheKey, result, ttl);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export { fetchData, getFullUrl };
