import {getUserAdv, getFavourites} from '../../api/api'
import { openByCategory } from '../catalog/categories-list';

const refs = {
  mobileCabinet: document.querySelector('.acc-cabinet-list'),
  desktopCabinet: document.querySelector('[data-id="desk"]'),
  burgerMenu: document.querySelector('.mobile-menu-closed'), 
  main: document.querySelector('.profile-container'),
};

const onMobCabinetClick = async (event)=>{
  const {id} = event.target.dataset;
  if(id === 'mobAdv'){
    openByCategory(await getUserAdv());
    // refs.burgerMenu.classList.remove('mobile-menu-opened')
    // refs.main.innerHTML = '';
  }
  if(id === 'mobFav'){
    openByCategory(await getFavourites(), true);
    // openByCategory(await getCategoriesSpecific(category));
    // refs.burgerMenu.classList.remove('mobile-menu-opened')
    // refs.main.innerHTML = '';
  }
}
// getUserAdv()

const onDesktopCabinetClick = async (event)=>{
  const {id} = event.target.dataset;
  if(id === 'adv'){
    openByCategory(await getUserAdv(), true);
  }
  if(id === 'fav'){
    openByCategory(await getFavourites());
  }
}


// const getMyAds = async () =>{
//  const userAdv = await getUserAdv();
//  console.log('userAdv', userAdv);
// }
// getMyAds();

refs.mobileCabinet.addEventListener('click', onMobCabinetClick)
refs.desktopCabinet.addEventListener('click', onDesktopCabinetClick)

