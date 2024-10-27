import axios from 'axios';

const API_KEY = '46684790-07ddeec26d5334b4228888751';
const BASE_URL = 'https://pixabay.com/api/';

const searchParams = {
  key: API_KEY,
  orientation: 'horizontal',
  image_type: 'photo',
  safesearch: true,
  per_page: 15,
};

export async function fetchImages(query, page = 1) {
  try {
    const refactoredQuery = prepareQuery(query);
    const url = `${BASE_URL}?q=${refactoredQuery}&page=${page}&${new URLSearchParams(
      searchParams
    )}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error(
      `Error fetching images with status ${
        error.response?.status
      } and response ${error.response?.statusText || ''}`
    );
  }
}

function prepareQuery(query) {
  const words = query.split(/\s+/);
  let refactoredQuery = '';
  for (const word of words) {
    if ((refactoredQuery + '+' + word).length > 100) break;
    refactoredQuery += (refactoredQuery ? '+' : '') + word;
  }
  return refactoredQuery;
}
