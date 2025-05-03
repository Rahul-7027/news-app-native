export const FetchNews = async (category, API_Key) => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_Key}`)
    let data = await response.json();
    return data.articles;
}