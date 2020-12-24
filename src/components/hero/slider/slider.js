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
  const randomSlides = _.shuffle(data) 
  refs.slider.insertAdjacentHTML('afterbegin', sliderTemplate(randomSlides));
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
