import '../../styles.css';
import './css/style.css';
import '../fonts/fonts.css';
import templateProductInfo from './templateProductInfo/templateProductInfo.hbs';
import { modalBackDrop } from '../modal/modalBackDrop.js';
import data from './data/data.json';
import { addFavourite, delFavourite } from '../servises/itemService';
import { loggedUser } from '../../data/data';

const card = document.querySelector('.img');

const productInfoMarkup = event => {
  const markup = templateProductInfo(data);
  modalBackDrop(markup);
  const imgRef = document.querySelector('.product-card__image__main');
  imgRef.src = data.imageUrls[0];
  const listImg = document.querySelector('.product-card__image__secondary');

  if (window.screen.width < 767) {
    $('.product-card__image__secondary').slick({
      arrows: false,
      dots: true,
    });
  } else {
    listImg.addEventListener('click', event => {
      const activeImg = event.target.dataset.id;
      imgRef.src = data.imageUrls[activeImg];
    });
  }

  const favorItem = document.querySelector('.icon');
  favorItem.addEventListener('click', async event => {
    //const activeId = event.target.dataset.id;
    const activeId = event.target.closest('[data-productid]').dataset.productid;
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
      .eyJ1aWQiOiI1ZmUzMWQyMmE0ZjYyYzAwMTdhZWE3ZTciLCJzaWQiOiI1ZmUzNDhkOWE0ZjYyYzAwMTdhZWE4NGQiLCJpYXQiOjE2MDg3MzA4NDEsImV4cCI6MTYwODczNDQ0MX0
      .NY0pf3M1uGCrraa35Fsog4AEUdJ8hMtEyLHc - Wh3i0E;

    //if (data.loggedUser.isAuth) {
    /*const favoriteControl = loggedUser.logInUser.favorites.some(
      item => item._id === activeId,
    );
    if (favoriteControl) {
      //localStorage.setItem('favoritOn', 'true');
      favorItem.classList.add("iconcolor");
    } else {
      //localStorage.removeItem('favoritOn', 'true');
      favorItem.classList.remove("iconcolor");
    }*/
    //console.log(activeId);

    favorItem.classList.add('iconcolor');
    const result = await addFavourite(activeId);
    console.log(result);
    //localStorage.setItem('favoritOn', activeId)

    /*if (localStorage.getItem('favoritOn') === activeId)
    {
      favorItem.classList.add("iconcolor");
    }
    else {
      delFavourite(activeId)
      favorItem.classList.remove("iconcolor");
      localStorage.removeItem('favoritOn')
    }*/

    //} else {console.log('Go to Sign Up');}
  });
};

// card.addEventListener('click', productInfoMarkup);
