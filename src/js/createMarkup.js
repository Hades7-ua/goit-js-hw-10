import refs from './refs';
const { select, error } = refs;

function createMarkup(data) {
  return data.map(({ id, name }) => ({ text: name, value: id }));
}

function createCatMarkup(catData) {
  const { url, breeds } = catData[0];
  const { name, description, temperament } = breeds[0];

  return `<div class="cat-info">
    <img src="${url}" width="480" alt="${name}">
    <div class="cat-box">
      <h2>${name}</h2>
      <p>${description}</p>
      <h2>Temperament</h2>
      <p>${temperament}</p>
    </div>
  </div>`;
}

export { createMarkup, createCatMarkup };
