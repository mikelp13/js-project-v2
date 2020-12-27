import './hero-slider.css';
import '../slider-item/slider-item.css';
import _ from '../../../../node_modules/lodash';
import { data } from '../../../data/data';
import { getAds } from '../../../api/api';
import sliderTemplate from './templates/hero-slider.hbs';
import itemsTemplate from '../slider-item/templates/items-template.hbs';

const runHeroSlider = () => {
  $('.slider').not('.slick-initialized').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    easing: '_ease_',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
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
  });
};

export const createHeroMarkup = data => {
  const randomItems = _.sampleSize(data, 5);
  const sideItems = randomItems.slice(0, 2);
  const bottomItems = randomItems.slice(2);
  const randomSlides = _.shuffle(data);
  const container = document.querySelector('.slider-container');
  const markup = `<section class="hero">
<div class="hero-wrapper">
  <div class="slider-wrapper">
    <ul class="slider" id="hero-slider">${sliderTemplate(randomSlides)}</ul>
  </div>
  <ul class="side-items">${itemsTemplate(sideItems)}</ul>
  <ul class="bottom-items">${itemsTemplate(bottomItems)}</ul>
</div>
</section>`;
  container.innerHTML = markup;
  runHeroSlider();
};

export const getSliderItems = async () => {
  await getAds();
  createHeroMarkup(data.calls.ads);
};
