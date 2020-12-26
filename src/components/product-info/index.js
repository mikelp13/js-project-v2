import '../../styles.css';
import './css/style.css';
import '../fonts/fonts.css';
import templateProductInfo from './templateProductInfo/templateProductInfo.hbs';
import { modalBackDrop } from '../modal/modalBackDrop.js';
import { favouriteApi } from '../../api/api';
import { data } from '../../data/data';

export function productInfoMarkup(dataMy) {
  const markup = templateProductInfo(dataMy);

  modalBackDrop(markup);
  const favorName = document.querySelector('.product-card__favorite');
  const favorItem = document.querySelector('.heart');
  if (localStorage.getItem('accessToken')) {
    if (data.user.favourites.some(item => item._id === dataMy._id)) {
      favorItem.classList.add('activeicon');
    }
  } else {
    if (localStorage.getItem('favorites')) {
      if (
        JSON.parse(localStorage.getItem('favorites')).some(
          item => item === dataMy._id,
        )
      ) {
        favorItem.classList.add('activeicon');
      }
    }
  }

  const imgRef = document.querySelector('.product-card__image__main');
  imgRef.src = dataMy.imageUrls[0];
  const listImg = document.querySelector('.product-card__image__secondary');

  if (window.screen.width < 767) {
    $(document).ready(function ($) {
      $('.product-card__image__secondary') //.not('.slick-initialized').
        .slick({
          arrows: false,
          dots: true,
        });
    });
  } else {
    listImg.addEventListener('click', event => {
      const activeImg = event.target.dataset.id;
      imgRef.src = dataMy.imageUrls[activeImg];
    });
  }

  favorItem.addEventListener('click', async event => {
    const activeId = event.target.closest('[data-productid]').dataset.productid;

    const result = await favouriteApi(activeId, favorItem, favorName);
  });
}
