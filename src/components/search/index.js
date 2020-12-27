import './style.css';
import { getAllCategories, getCategoriesSpecific } from '../../api/api';
import findCard from '../../components/search/templatesSearch.hbs';
import { data } from '../../data/data';
import axios from 'axios';
import cardTpl from '../catalog/categories-list-item/template/category.hbs';
import { refreshMain } from '../header/js/header';
const baseUrl = 'https://callboard-backend.herokuapp.com';

const main = document.querySelector('.main');
const searchForm = document.querySelector('.js-search-form-desk');
const searchForm2 = document.querySelector('.js-search-form-tablet');
//=========data=!!!=====start========

export const getSearchQuery = async query => {
  if (data.calls.categories.some(item => item.includes(query))) {
    const category = data.calls.categories.find(item => item.includes(query));
    if (data.calls.specificCategory[category].length) {
      console.log(data.calls.specificCategory[category]);
      return data.calls.specificCategory[category];
    } else {
      console.log(getCategoriesSpecific(category));
      const result = await getCategoriesSpecific(category);
      console.log('result :>> ', result);
      return result.data;
    }
  } else {
    // const result = await getAllCategories(query)
    const result = await axios.get(`${baseUrl}/call/find?search=${query}`);
    console.log('result :>> ', result);
    return result.data;
  }
};
//   await getCategoriesSpesific(
//     data.calls.specificCategory.find(item => item.includes(query)),
//   );
//   console.log(data.calls.specificOneCategory);
//   updateMarkup();

//   // console.log(data.calls.specificCategory[query]);
//   //const allCategories = await getCategories();
//   // allCategories.find(item => item.includes(query));
//   // // return data.calls.categories;
// } else {
//   return fetch(`${baseUrl}/call/find?search=${query}`).then(response =>
//     response.json().then(data => data),
//   );
// }

//=========data=!!!=====end==========
//========
//
//
// переписати під провірку категорії

// export const getSearchQuery = query => {
//   return fetch(`${baseUrl}/call/find?search=${query}`)
//     .then(response => response.json())
//     .then(data => data);
// };

//
//
//
//
export const updateMarkup = goods => {
  // const searchMarkup = findCard(goods);
  // main.insertAdjacentHTML('beforeend', searchMarkup);
  console.log('goods :>> ', goods);
  main.innerHTML = `
    <div class="search-container">
    <button class="close-search-btn" type="button">закрити</button>
      <ul class="search-gallery">${cardTpl(goods)}</ul>
    </div>
  `;
  getCloseBtn();
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

//===================closeBtn=============================

  const getCloseBtn = () => {
    const closeBtn = document.querySelector('.close-search-btn');
    closeBtn.addEventListener('click', refreshMain);
};
