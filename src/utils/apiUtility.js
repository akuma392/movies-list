

const url = 'https://imdb236.p.rapidapi.com/api/imdb/india/top-rated-indian-movies';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'd9165dc9c9msh07e011ce1852f0fp15391bjsn4e1fdf753492',
        'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
};

async function fetchData(movieUrl = url) {
    try {
        const response = await fetch(movieUrl, options);
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
    }
}

export { fetchData };
