// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

galleryItems.forEach(({ preview, original, description }) => {
  galleryEl.insertAdjacentHTML(
    'beforeend',
    `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
  );
});

let lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionDelay: 250,
});
