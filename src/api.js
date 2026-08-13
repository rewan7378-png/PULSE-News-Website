const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;

export async function getTopHeadlines() {
  const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`NewsData API Error: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
}

export async function getNewsByCategory(category) {
  const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=${category}`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`NewsData API Error: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
}

export async function searchNews(query) {
  const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&q=${encodeURIComponent(query)}`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`NewsData API Error: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
}