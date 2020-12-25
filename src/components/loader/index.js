import './styles.css';
import { data } from '../../data/data';
import { createMarkup, runSlider } from '../catalog/categories-list-item/index';
import { getCategoriesSpesific} from '../../api/api';

export const runLoader = () => { 

    const buttonLoaderRef = document.querySelector('.loader__btn'); 
    const colorLoaderRef = document.querySelector('.loader');

    const loaderCategory = async () => { 

        await  getCategoriesSpesific(data.calls.categories[data.renderedCategories.length]);
        createMarkup(data.renderedCategories.length);
        data.renderedCategories.push(data.calls.categories[data.renderedCategories.length]);
        runSlider();
        if (data.renderedCategories.length === 8) {
          // data.calls.categories.length + 1
            buttonLoaderRef.className = 'loader__btn hide';
            colorLoaderRef.className = 'loader hide';
        }
    }
    buttonLoaderRef.addEventListener('click', loaderCategory);

    
}

