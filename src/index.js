import '../node_modules/normalize.css/normalize.css';
import './styles.css';
import './components/header/js/header';
import './components/hero/slider/slider';
import './components/hero/slider-item/slider-item';
import './components/footer/styles.js';
import './components/card/index';
import './components/auth/auth';
import './components/search/index';
import './components/modal/modalBackDrop.js';
import './components/developers/js/index';
import './components/developers/modal-window/dev-modal';
import './components/catalog/categories-list-item/index.js';
import './components/auth/accCabinet';
import './components/header/js/color-switch';
// import './components/spinner/spin';
import './components/product-info/index.js';
import './components/header/js/newAdv';
// import './components/ads/newAddForm/newAddForm.js';
import { getAds } from './api/api';
import './components/spinLoad/spinLoad';

import { createСategories } from './components/catalog/categories-list-item/index.js';
import { data } from './data/data';
import { getCategories, getCategoriesSpesific, getRussianCategories } from './api/api';

const getInitialData = async () => {
  await getCategories();
  await getRussianCategories();
  await getCategoriesSpesific(data.calls.categories[0]);
  await getCategoriesSpesific(data.calls.categories[1]);
  await getCategoriesSpesific(data.calls.categories[2]);
  await getCategoriesSpesific(data.calls.categories[3]);

  createСategories();
};
getInitialData();
