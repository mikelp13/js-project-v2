import '../node_modules/normalize.css/normalize.css';
import './styles.css';
import './components/header/js/header';
import './components/hero/slider/slider';
import './components/hero/slider-item/slider-item';
import './components/footer/styles.js';
import './components/card/index';
import './components/auth/auth';
import './components/modal/modalBackDrop.js';
import './components/developers/js/index';
import './components/developers/modal-window/dev-modal';
import './components/catalog/categories-list-item/index.js';
import './components/auth/accCabinet';
// import './components/spinner/spin';
import './components/product-info/index.js';
import './components/header/js/newAdv';
// import './components/search/index';
// import './components/ads/newAddForm/newAddForm.js';

import { createСategories } from './components/catalog/categories-list-item/index.js';
import { data } from './data/data';
import {
  getCategories,
  getRuCategories,
  getCategoriesSpecific,
} from './api/api';

const getInitialData = async () => {
  await getCategories();
  await getRuCategories();
  const catSpecPromise = await Promise.all([
    getCategoriesSpecific(data.calls.categories[0]),
    getCategoriesSpecific(data.calls.categories[1]),
    getCategoriesSpecific(data.calls.categories[2]),
    getCategoriesSpecific(data.calls.categories[3]),
  ]);
  data.renderedCategories.push(
    data.calls.categories[0],
    data.calls.categories[1],
  );
  createСategories();
};
getInitialData();
