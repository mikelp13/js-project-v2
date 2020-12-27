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
    openByCategory(await getUserAdv(), true);
    const burgerWrapper = document.querySelector('.mobile-menu-closed');
    burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
  }
  if (id === 'mobFav') {
    openByCategory(await getFavourites());
    const burgerWrapper = document.querySelector('.mobile-menu-closed');
    burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
  }
};

const onDesktopCabinetClick = async event => {
  const { id } = event.target.dataset;
  if (id === 'adv') {
    openByCategory(await getUserAdv(), true);
  }
  if (id === 'fav') {
    openByCategory(await getFavourites());
  }
};

refs.mobileCabinet.addEventListener('click', onMobCabinetClick);
refs.desktopCabinet.addEventListener('click', onDesktopCabinetClick);
