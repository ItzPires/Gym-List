export async function UseFetch(url) {
    const baseUrl = 'https://exercisedb.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST
        }
    };

    try {
        const response = await fetch(baseUrl + url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        return null;
    }
}
