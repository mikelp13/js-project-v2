import './hero-slider.css';
import '../slider-item/slider-item.css';
import _ from '../../../../node_modules/lodash';
import { data } from '../../../data/data';
import { getAds } from '../../../api/api';
import sliderTemplate from './templates/hero-slider.hbs';
import itemsTemplate from '../slider-item/templates/items-template.hbs';

const refs = {
  slider: document.querySelector('#hero-slider'),
  sideItemList: document.querySelector('.side-items'),
  bottomItemList: document.querySelector('.bottom-items'),
};

const createSliderMarkup = data => {
  refs.slider.insertAdjacentHTML('afterbegin', sliderTemplate(data));
};

const createItemsMarkup = data => {
  const randomItems = _.sampleSize(data, 5);
  const sideItems = randomItems.slice(0, 2);
  const bottomItems = randomItems.slice(2);

  refs.bottomItemList.insertAdjacentHTML(
    'beforeend',
    itemsTemplate(bottomItems),
  );
  refs.sideItemList.insertAdjacentHTML('beforeend', itemsTemplate(sideItems));
};

const getSliderItems = async () => {
  await getAds();
  createItemsMarkup(data.calls.ads);
  $(document).ready(function () {
    $('.slider').slick({
      arrows: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      easing: '_ease_',
      infinite: true,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 1000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      draggable: true,
      swipe: true,
      touchThreshold: 1,
      touchMove: true,
      waitForAnimate: false,
      centralMode: false,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 320,
        },
        {
          breakpoint: 768,
        },
        {
          breakpoint: 1280,
        },
      ],
    });
  });
  $('.slider').slick('slickAdd', createSliderMarkup(data.calls.ads));
 
};

getSliderItems();

//===

// -------------------------------------- test -----------------------------------------------
// const items = [
//   {
//     title: 'Smart Watch',
//     price: 799,
//     imageUrl:
//       './images/hero-img/watch.png',
//   },
//   {
//     title: 'New T-Shirt',
//     price: 699,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/bdefcbc72735f64db17f3250b1e64245.png',
//   },
//   {
//     title: 'Nikon Camera',
//     price: 3499,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/photo_camera_PNG7834.png',
//   },
//   {
//     title: 'Apple Monitor',
//     price: 8999,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/580b57fbd9996e24bc43bfe2.png',
//   },
//   {
//     title: 'Old School Radio',
//     price: 975,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/58ac44f7f86c9c2eea74c4e6.png',
//   },
//   {
//     title: 'Compact Stereo Speakers',
//     price: 850,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/z120-stereo-speakers.png',
//   },
//   {
//     title: 'Flying Drone 42K black',
//     price: 4000,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/5cb84c5f7ff3656569c8cec5.png',
//   },
//   {
//     title: 'Powerful Black Speakers',
//     price: 999,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/Speaker-PNG-Background-Image.png',
//   },
//   {
//     title: 'Pink Beat Headphones',
//     price: 599,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/580b57fbd9996e24bc43bfba.png',
//   },
//   {
//     title: 'Vintage Microphone and Stand',
//     price: 2400,
//     imageUrl:
//       'https://storage.googleapis.com/kidslikev2_bucket/580b57fbd9996e24bc43bfdb.png',
//   },
// ];

// function createMarkup(items) {
//   const sliderItems = items.reduce(
//     (acc, { title, price, imageUrl }) => {
//       acc += `<li class="slider__item">
//       <div class="slider__description">
//         <p class="slider__title">${title}</p>
//         <p class="slider__price">${price}</p>
//       </div>
//       <img class="slider__img" src="${imageUrl}" alt="${title}">
//     </li>`;
//       return acc;
//     },
//     ""
//   );
//   return sliderItems;
// }

// refs.slider.insertAdjacentHTML('afterbegin', createMarkup(items));
