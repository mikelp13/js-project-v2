import '../node_modules/normalize.css/normalize.css';
import './styles.css';
import './components/header/js/header';
import './components/hero/slider-item/slider-item';
import './components/footer/styles.js';
import './components/card/index';
// import './components/loader/index';
// import './components/auth/auth';
// import './components/modal/modalBackDrop.js';
// import './components/developers/js/index';
// import './components/developers/modal-window/dev-modal';
// import './components/catalog/categories-list-item/index.js';
// import './components/auth/accCabinet';
// import './components/spinner/spin';
// import './components/header/js/newAdv';
// import './components/ads/newAddForm/newAddForm.js';
import { createСategories } from './components/catalog/categories-list-item/index.js';

import { data } from "./data/data";
import { getCategories } from './api/api';
import { getCategoriesSpesific } from './api/api';


const getInitialData = async () => {
    await getCategories();

    await getCategoriesSpesific(data.calls.categories[0]);
    await getCategoriesSpesific(data.calls.categories[1]);
    await getCategoriesSpesific(data.calls.categories[2]);
    await getCategoriesSpesific(data.calls.categories[3]);
    createСategories();
    
//   data.renderedCategories.push(
//     data.calls.categories[0],
//     data.calls.categories[1],
//   );
//   console.log(data);
//   setTimeout(() => {
//     getMore();
//   }, 5000);
};
getInitialData();


// const getMore = async () => {
//   await getCategoriesSpesific(data.calls.categories[data.renderedCategories.length]);
//   data.renderedCategories.push(
//     data.calls.categories[data.renderedCategories.length],
//   );
//   console.log(data);
// };
