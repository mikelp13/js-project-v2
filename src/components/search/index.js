import './style.css';
import findCard from '../../components/search/templatesSearch.hbs';

const baseUrl = 'https://callboard-backend.herokuapp.com';
const main = document.querySelector('.main');
const searchForm = document.querySelector('.js-search-form-desk');
const searchForm2 = document.querySelector('.js-search-form-tablet');

//========
//
//
// переписати під провірку категорії
export const getSearchQuery = query => {
  return fetch(`${baseUrl}/call/find?search=${query}`)
    .then(response => response.json())
    .then(data => data);
};

//
//
//
//
export const updateMarkup = goods => {
  const searchMarkup = findCard(goods);
  // main.insertAdjacentHTML('beforeend', searchMarkup);
  main.innerHTML = `
    <div class="container">
      <ul class="search-gallery">${searchMarkup}</ul>
    </div>
  `;
};

const getSearchItem = event => {
  event.preventDefault();
  // main.innerHTML = '';
  let form = event.currentTarget;
  let inputValue = form.elements.query.value;
  inMobileEnter(inputValue);
  form.reset();
};

const inMobileEnter = inputValue => {
  if (inputValue.length >= 1) {
    getSearchQuery(inputValue)
      .then(goods => {
        updateMarkup(goods);
      })
      .catch(error => console.log(error));
  }
};

//====mobil=========
const mainInputMob = document.querySelector("input[name='query']");
const mobileInputBtn = document.querySelector('.mobile-input-btn');
//============

let inputValueForBtn = '';
let inputValue = '';
const getSearchItemMobile = event => {
  main.innerHTML = '';
  inputValue = event.target.value;
  inputValueForBtn = event.target.value;
  mobileInputBtn.addEventListener('click', e => {
    if (inputValueForBtn.length >= 1) {
      getSearchQuery(inputValueForBtn).then(goods => {
        updateMarkup(goods);
      });
    }
    mainInputMob.value = '';
  });
};

const onPressEnterSearch = event => {
  if (event.code === 'Enter') {
    if (mainInputMob.value.length >= 1) {
      getSearchQuery(mainInputMob.value)
        .then(goods => {
          updateMarkup(goods);
        })
        .catch(error => console.log(error));
    }
    mainInputMob.value = '';
  }
};

//========mobil=============
searchForm.addEventListener('submit', getSearchItem);
searchForm2.addEventListener('submit', getSearchItem);
mainInputMob.addEventListener('change', getSearchItemMobile);
document.addEventListener('keydown', onPressEnterSearch);
