// import './slider-item.css';
// // import itemModalTpl from './templates/item-modal.hbs';
// // import { modalBackDrop } from '../../modal/modalBackDrop';
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
