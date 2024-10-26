import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import { showWarning } from './js/toast';

const form = document.querySelector('.action-form');
const loadMoreBtn = document.getElementById('load-more');
const loader = document.querySelector('.loader');
export const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function handleSearchSubmit(event) {
  event.preventDefault();
  currentQuery = form.elements.query.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    return showWarning('Please enter a valid query!');
  }

  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden'); // Ensure Load More button is hidden at the start
  loader.classList.remove('is-hidden'); // Show loader during the search

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;
    console.log('Total hits:', totalHits); // Log to check the total hits value

    renderImages(data.hits, false); // Render fetched images
    loader.classList.add('is-hidden'); // Hide loader after loading
    galleryLightbox.refresh(); // Refresh the lightbox gallery

    // Decide if Load More button should be visible based on results
    if (data.hits.length > 0 && totalHits > 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }

    if (!data.hits.length) {
      showWarning("We're sorry, but no results were found.");
    }
  } catch (error) {
    console.error(error);
    loader.classList.add('is-hidden');
    showWarning('Sorry, something went wrong. Please try again!');
  } finally {
    form.reset();
  }
}

async function loadMoreImages() {
  currentPage++;
  loader.classList.remove('is-hidden'); // Show loader during loading more images

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits, true); // Append new images to existing gallery
    loader.classList.add('is-hidden'); // Hide loader after loading
    galleryLightbox.refresh();

    // Log to confirm current page and total hits
    console.log(`Current Page: ${currentPage}, Total Hits: ${totalHits}`);

    // Check if the Load More button should be hidden
    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      showWarning("You've reached the end of the search results.");
    }

    // Smooth scroll to newly loaded images
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    console.error(error);
    loader.classList.add('is-hidden');
    showWarning('Unable to load more images. Please try again later.');
  }
}

// Initialize SimpleLightbox for gallery links
let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
