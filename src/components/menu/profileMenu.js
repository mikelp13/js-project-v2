import {getUserAdv} from '../../api/api'

const refs = {
  mobileCabinet: document.querySelector('.acc-cabinet-list'),
  desktopCabinet: document.querySelector('[data-id="desk"]'),
  burgerMenu: document.querySelector('.mobile-menu-closed'), 
  main: document.querySelector('.main'),
};

const onMobCabinetClick = (event)=>{
  const {id} = event.target.dataset;
  if(id === 'mobAdv'){
    refs.burgerMenu.classList.remove('mobile-menu-opened')
    refs.main.innerHTML = '';
  }
  if(id === 'mobFav'){
    refs.burgerMenu.classList.remove('mobile-menu-opened')
    refs.main.innerHTML = '';
  }
}

const onDesktopCabinetClick = (event)=>{
  const {id} = event.target.dataset;
  if(id === 'adv'){
    refs.main.innerHTML = '';
  }
  if(id === 'fav'){
    refs.main.innerHTML = '';
  }
}


// const getMyAds = async () =>{
//  const userAdv = await getUserAdv();
//  console.log('userAdv', userAdv);
// }
// getMyAds();

refs.mobileCabinet.addEventListener('click', onMobCabinetClick)
refs.desktopCabinet.addEventListener('click', onDesktopCabinetClick)

