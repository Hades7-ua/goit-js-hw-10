import refs from './refs';
const { select, error } = refs;

export default function createMarkup(data) {
  return data.map(({ id, name }) => ({ text: name, value: id }));
}
