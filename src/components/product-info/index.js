import '../../components/fonts/fonts.css';

import './css/style.css';
import templateProductInfo from './templateProductInfo/templateProductInfo.hbs';
import { modalBackDrop } from '../modal/modalBackDrop.js';
//import dataMy from './data/dataMy.json';
import { addFavourite, delFavourite } from '../servises/itemService';
import { data } from '../../data/data';
import axios from 'axios';

const card = document.querySelector('.img');

export function productInfoMarkup (dataMy) {
  const markup = templateProductInfo(dataMy);

  modalBackDrop(markup);
  const favorName = document.querySelector('.name');
  const favorItem = document.querySelector('.heart');
  //const favor = document.querySelector('.product-card__favorite')

  if (localStorage.getItem('accessToken')) {
    if (data.user.favourites.some(item=> item._id === dataMy._id))
    {
      favorItem.classList.add('active-icon')
      favorName.classList.add('active-icon')
    }

  }
  else {
    if (localStorage.getItem('favorites')){
  if (JSON.parse(localStorage.getItem('favorites')).some(item => item === dataMy._id))
  {
    favorItem.classList.add('active-icon')
    favorName.classList.add('active-icon')
  }}
 }

  const imgRef = document.querySelector('.product-card__image__main');
  imgRef.src = dataMy.imageUrls[0];
  const listImg = document.querySelector('.product-card__image__secondary');

  if (window.screen.width < 767) {
    $(document).ready(function ($) {
    $('.product-card__image__secondary').not('.slick-initialized').
    slick({
      arrows: false,
      dots: true,
    });
  })
  } else {
    
    //listImg.addEventListener('click', event => {
     // const activeImg = event.target.dataset.id;
     // imgRef.src = dataMy.imageUrls[activeImg];
   //
  // });
  }

  favorItem.addEventListener('click', async event => {

    const activeId = event.target.closest('[data-productid]').dataset.productid;

      const result =  await addFavourite(activeId, favorItem, favorName)
     // console.log(result);

    console.log(activeId);

  });
};

console.log(data);
