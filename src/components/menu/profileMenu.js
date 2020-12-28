import { getUserAdv, getFavourites } from '../../api/api';
import { openByCategory } from '../catalog/categories-list';

const refs = {
  mobileCabinet: document.querySelector('.acc-cabinet-list'),
  desktopCabinet: document.querySelector('[data-id="desk"]'),
  burgerMenu: document.querySelector('.mobile-menu-closed'),
  main: document.querySelector('.profile-container'),
};

const onMobCabinetClick = async event => {
  const { id } = event.target.dataset;
  if (id === 'mobAdv') {
    const result = await getUserAdv();
    if (!result.length) {
      document.querySelector('.slider-container').innerHTML = '';
      document.querySelector(
        '.categories-container',
      ).innerHTML = `<p class ="none-product">Нет добавленных товаров</p>`;
      const burgerWrapper = document.querySelector('.mobile-menu-closed');
      burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
    } else {
      openByCategory(result, true);
      const burgerWrapper = document.querySelector('.mobile-menu-closed');
      burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
    }
  }
  if (id === 'mobFav') {
    const result = await getFavourites();
    if (!result.length) {
      document.querySelector('.slider-container').innerHTML = '';
      document.querySelector(
        '.categories-container',
      ).innerHTML = `<p class ="none-product">Нет избранных товаров</p>`;
      const burgerWrapper = document.querySelector('.mobile-menu-closed');
      burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
    } else {
      openByCategory(result);
      const burgerWrapper = document.querySelector('.mobile-menu-closed');
      burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
    }
  }
};
const onDesktopCabinetClick = async event => {
  const { id } = event.target.dataset;
  if (id === 'adv') {
    const result = await getUserAdv();
    if (!result.length) {
      document.querySelector('.slider-container').innerHTML = '';
      document.querySelector(
        '.categories-container',
      ).innerHTML = `<p class ="none-product">Нет добавленных товаров</p>`;
    } else {
      openByCategory(result, true);
    }
  }
  if (id === 'fav') {
    const result = await getFavourites();
    if (!result.length) {
      document.querySelector('.slider-container').innerHTML = '';
      document.querySelector(
        '.categories-container',
      ).innerHTML = `<p class ="none-product">Нет избранных товаров</p>`;
    } else {
      openByCategory(result);
    }
  }
};

refs.mobileCabinet.addEventListener('click', onMobCabinetClick);
refs.desktopCabinet.addEventListener('click', onDesktopCabinetClick);
