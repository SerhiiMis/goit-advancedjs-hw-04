import { gallery } from '../main';
import { showError } from './toast';

export function renderImages(images, append = false) {
  if (images.length === 0) {
    showError(
      'Sorry, there are no images matching your search query. Please try again!'
    );
    return;
  }

  const markup = images
    .map(
      image => `<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      alt="${image.tags}"
      data-likes="${image.likes}"
      data-views="${image.views}"
      data-comments="${image.comments}"
      data-downloads="${image.downloads}"
    />
  </a>
  <ul class="stats">
    <li class="stats-item">
      <p class="stats-item-header">Likes</p>
      <p class="stats-item-value">${image.likes}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Views</p>
      <p class="stats-item-value">${image.views}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Comments</p>
      <p class="stats-item-value">${image.comments}</p>
    </li>
    <li class="stats-item">
      <p class="stats-item-header">Downloads</p>
      <p class="stats-item-value">${image.downloads}</p>
    </li>
  </ul>
</li>`
    )
    .join('');

  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}
