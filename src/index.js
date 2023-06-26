import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_dBchgHREbQNfxjdxMs42VxGothK4l5e0eEcVX7fLaFe6MmWBeww5tuF1UtuwncHv';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { createMarkup, createCatMarkup } from './js/createMarkup';
import SlimSelect from 'slim-select';
import refs from './js/refs';
import Notiflix from 'notiflix';

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
    .then(catData => {
      const html = createCatMarkup(catData);
      catInfo.innerHTML = html;
      loader.classList.remove('loader');
      catInfo.classList.remove('cat-none');
      error.classList.remove('error-none');
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      error.classList.add('error-none');
    });
}
