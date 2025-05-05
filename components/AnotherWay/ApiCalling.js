export const fetchData = async (category, API_Key) => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_Key}`);
    const getData = await response.json();
    return getData.articles;
}