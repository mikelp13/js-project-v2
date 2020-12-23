import './style.css';
import findCard from '../../components/search/templatesSearch.hbs';
import createInputMarkup from '../../components/search/formSearch.hbs';

// Форма!!!
const baseUrl = 'https://callboard-backend.herokuapp.com';
const main = document.querySelector('.main');
const searchForm = document.querySelector('.js-search-form');

//

export const getSearchQuery = query => {
  return fetch(`${baseUrl}/call/find?search=${query}`)
    .then(response => response.json())
    .then(data => data);
};

export const updateMarkup = goods => {
  console.log('goods', goods);
  const searchMarkup = findCard(goods);
  // main.insertAdjacentHTML('beforeend', searchMarkup);
  main.innerHTML = `
    <div class="container">
      <ul class="search-gallery">${searchMarkup}</ul>
    </div>
  `;
};

// let inputValue = '';

const getSearchItem = event => {
  event.preventDefault();
  main.innerHTML = '';
  let form = event.currentTarget;
  let inputValue = form.elements.query.value;
  inMobileEnter(inputValue);
  console.log(inputValue);
};

const inMobileEnter = inputValue => {
  // console.log('inmobile', inputValue);
  if (inputValue.length >= 1) {
    getSearchQuery(inputValue)
      .then(goods => {
        updateMarkup(goods);
      })
      .catch(error => console.log(error));
  }
};

searchForm.addEventListener('submit', getSearchItem);

// дані від Юри
/* 
          Получение страниц с категориями по запросу(значения поля поиск)
          */

// export const getSearchQuery = searchQuery => {
//   return axios.get(`${baseUrl}/call/find?search=${searchQuery}`);
// };

// getSearchQuery();

//===

/* 
 Получает список всех категорий товаров
*/

// [
//   "property",
//   "transport",
//   "work",
//   "electronics",
//   "business and services",
//   "recreation and sport",
//   "free",
//   "trade",
// ];

// export const getCategories = () => {
//   return axios.get(`${baseUrl}/call/categories`);
// };

// getCategories();
