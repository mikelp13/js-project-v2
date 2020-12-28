import '../node_modules/normalize.css/normalize.css';
import './styles.css';
// import './components/header/js/header';
import './components/hero/slider/slider';
// import './components/hero/slider-item/slider-item';
import './components/footer/styles.js';
import './components/card/index';
import './components/auth/auth';
import './components/product-info/index';
import './components/search/index';
import './components/modal/modalBackDrop.js';
import './components/developers/js/index';
import './components/developers/modal-window/dev-modal';
import './components/catalog/categories-list-item/index.js';
import './components/auth/accCabinet';
import './components/header/js/color-switch';
// import './components/spinner/spin';
import './components/product-info/index.js';
import { newAdv } from './components/header/js/newAdv';
// import './components/ads/newAddForm/newAddForm.js';
import { getUserData } from './api/api';
import { createMainMarkup } from './components/main/index';
import { getSliderItems } from './components/hero/slider/slider';
import './components/spinLoad/spinLoad';
import { createСategories } from './components/catalog/categories-list-item/index.js';
import { data } from './data/data';
import {
    getCategories,
    getCategoriesSpecific,
    getRussianCategories,
} from './api/api';
import './components/menu/profileMenu';
import { createHeader } from './components/header/js/header';

const getInitialData = async() => {
    await getCategories();
    const catSpecPromise = await Promise.all([
        getRussianCategories(),
        getCategoriesSpecific(data.calls.categories[0]),
        getCategoriesSpecific(data.calls.categories[1]),
        getCategoriesSpecific(data.calls.categories[2]),
        getCategoriesSpecific(data.calls.categories[3]),
    ]);
    createMainMarkup();
    createСategories();
    getSliderItems();
    newAdv();
    createHeader();
};
getInitialData();