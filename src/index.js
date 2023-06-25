import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_dBchgHREbQNfxjdxMs42VxGothK4l5e0eEcVX7fLaFe6MmWBeww5tuF1UtuwncHv';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import createMarkup from './js/createMarkup';
import SlimSelect from 'slim-select';
import refs from './js/refs';

const { select, loader, error, catInfo } = refs;

const slimSel = new SlimSelect({
  select: '.breed-select',
});

fetchBreeds()
  .then(el => {
    slimSel.setData(createMarkup(el));
  })
  .catch(err => {
    console.log(err);
    error.classList.remove('error-none');
  });

select.addEventListener('change', handleOnSelect);

function handleOnSelect(e) {
  const id = e.target.value;
  loader.classList.add('loader');
  catInfo.classList.add('cat-none');

  fetchCatByBreed(id)
    .then(id => {
      const html = `<div class="cat-info">
      <img src='${id[0].url}' width='480' alt="${id[0].breeds[0].name}">
      <div class="cat-box">
          <h2>${id[0].breeds[0].name}</h2>
          <p>${id[0].breeds[0].description}</p>
      <h2>Temperament</h2>
      <p>${id[0].breeds[0].temperament}</p>
      </div>
  </div>`;
      catInfo.innerHTML = html;
      loader.classList.remove('loader');
      catInfo.classList.remove('cat-none');
      error.classList.remove('error-none');
    })

    .catch(error => {
      console.log(error);
      error.classList.add('error-none');
    });
}
