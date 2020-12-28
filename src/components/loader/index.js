import './styles.css';
import { data } from '../../data/data';
import { createMarkup, runSlider } from '../catalog/categories-list-item/index';
import { getCategoriesSpecific } from '../../api/api';

export const runLoader = () => {
  const buttonLoaderRef = document.querySelector('.loader__btn');
  const colorLoaderRef = document.querySelector('.loader');
  document.querySelector('.slider-container').innerHTML = '';
  const loaderCategory = async () => {
    await getCategoriesSpecific(
      data.calls.categories[data.renderedCategories.length],
    );
    createMarkup(data.renderedCategories.length);
    runSlider();
    if (data.renderedCategories.length === data.calls.categories.length) {
      buttonLoaderRef.className = 'loader__btn hide';
      colorLoaderRef.className = 'loader hide';
    }
  };
  buttonLoaderRef.addEventListener('click', loaderCategory);
};
