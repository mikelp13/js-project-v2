// import './slider-item.css';
// import itemsTemplate from './templates/items-template.hbs';
// // import itemModalTpl from './templates/item-modal.hbs';
// import { getAds } from '../../../api/api';
// // import { modalBackDrop } from '../../modal/modalBackDrop';
// import _ from '../../../../node_modules/lodash';
// import { data } from '../../../data/data';

// const refs = {
//   // sliderItem: document.querySelector('.hero-wrapper'),
//   sideItemList: document.querySelector('.side-items'),
//   bottomItemList: document.querySelector('.bottom-items'),
//   // backDrop: document.querySelector('.modal'),
// };

// // const getSliderItems = () => {
// //   getAds().then(response => {
// //     const itemsArr = response.data;
// //     createMarkup(itemsArr);
// //   });
// // };
// // getSliderItems();
// const getSliderItems = async () => {
//   await getAds();
//   createMarkup(data.calls.ads);
// };

// // getSliderItems();

// // ====== callback refactoring ===============

// // export const getSliderItems = (callback) => {
// //   getAds().then(response => {
// //     const itemsArr = response.data;
// //     callback(itemsArr);
// //   });
// // };
// // getSliderItems(createMarkup);
// //==============================================

// const createMarkup = data => {
//   const randomItems = _.sampleSize(data, 5);
//   const sideItems = randomItems.slice(0, 2);
//   const bottomItems = randomItems.slice(2);

//   refs.bottomItemList.insertAdjacentHTML(
//     'beforeend',
//     itemsTemplate(bottomItems),
//   );
//   refs.sideItemList.insertAdjacentHTML('beforeend', itemsTemplate(sideItems));
// };

// // // open modal
// // const onItemClick = event => {
// //   const {
// //     target: { nodeName },
// //   } = event; //event.target destructuring

// //   if (nodeName !== 'LI' && nodeName !== 'IMG') return;
// //   modalBackDrop(itemModalTpl());
// //   console.log(nodeName);
// //   console.log(event.target);
// // };

// // //close modal
// // const onCloseBtnClick = event => {
// //   const modalCloseBtn = document.querySelector('.modal-close-btn');
// //   if (event.target === modalCloseBtn) {
// //     refs.backDrop.classList.remove('is-open');
// //   }
// // };

// // refs.sliderItem.addEventListener('click', onItemClick);
// // refs.backDrop.addEventListener('click', onCloseBtnClick);
