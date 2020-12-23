import './slider-item.css';
import itemsTemplate from './templates/items-template.hbs';
import itemModalTpl from './templates/item-modal.hbs';
import { getAds } from '../../servises/itemService';
import { modalBackDrop } from '../../modal/modalBackDrop';
import _ from '../../../../node_modules/lodash';

const refs = {
  sliderItem: document.querySelector('.hero-wrapper'),
  sideItemList: document.querySelector('.side-items'),
  bottomItemList: document.querySelector('.bottom-items'),
};


const getSliderItems = ()=>{
  getAds().then(response => {
    const itemsArr = response.data;
    createMarkup(itemsArr);
  })
}
getSliderItems()


const createMarkup = data => {
  const randomItems = _.sampleSize(data, 5);
  const sideItems = randomItems.slice(0, 2);
  const bottomItems = randomItems.slice(2);

    refs.bottomItemList.insertAdjacentHTML(
      'beforeend',
      itemsTemplate(bottomItems),
    );
    refs.sideItemList.insertAdjacentHTML(
      'beforeend',
      itemsTemplate(sideItems),
    );
};

// open modal
const onItemClick = event => {
  const {
    target: { nodeName },
  } = event; //event.target destructuring
  
  if (nodeName !== 'LI' && nodeName !== 'IMG') return;
  modalBackDrop(itemModalTpl());
  console.log(nodeName);
  console.log(event.target);
};

refs.sliderItem.addEventListener('click', onItemClick);
