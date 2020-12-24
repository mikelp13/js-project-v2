
import '../../styles.css'
import './css/style.css'
import '../fonts/fonts.css'
import templateProductInfo from './templateProductInfo/templateProductInfo.hbs'
import {modalBackDrop} from '../modal/modalBackDrop.js'
import dataMy from './data/dataMy.json'
import {getFavourites, addFavourite, delFavourite} from '../servises/itemService'
import {data} from '../../data/data'
import axios from 'axios';




const card = document.querySelector('.img')


 function productInfoMarkup  (dataMy)  {
  const markup = templateProductInfo(dataMy);
  modalBackDrop(markup);
  const imgRef = document.querySelector(".product-card__image__main");
  imgRef.src = dataMy.imageUrls[0];
  const listImg = document.querySelector(".product-card__image__secondary")


if (window.screen.width < 767)
{
  $('.product-card__image__secondary').slick({
    arrows: false,
    dots: true,
})
  }
 else {
 listImg.addEventListener('click', (event) => {
   const activeImg = event.target.dataset.id;
    imgRef.src = dataMy.imageUrls[activeImg];
  })
}


  const favorItem = document.querySelector(".icon");
  favorItem.addEventListener('click', async (event) => {
    //const activeId = event.target.dataset.id;
    const activeId = event.target.closest('[data-productid]').dataset.productid;

    getFavourites().then(favorites => {
      data.user.favorites = favorites;
    } )

    //if (data.loggedUser.isAuth) {
    const favoriteControl = data.user.favorites.some(
      item => item._id === activeId,
    );
    if (!favoriteControl) {
      //localStorage.setItem('favoritOn', 'true');
      const result =  await addFavourite(activeId).then(response => {
        data.user.favorites = [...data.user.favorites, activeId]
      favorItem.classList.add("iconcolor");
     });

    } else {
      //localStorage.removeItem('favoritOn', 'true');
      favorItem.classList.remove("iconcolor");
    }
    console.log(activeId);

    favorItem.classList.add("iconcolor");
    const result =  await addFavourite(activeId);
    console.log(result);
    localStorage.setItem('favoritOn', activeId)


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

}
)
}

card.addEventListener('click', productInfoMarkup(dataMy));





























