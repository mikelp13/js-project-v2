import './styles.css';

import itemTemplate from '../categories-list-item/template/category.hbs';
import { getSliderItems } from '../../hero/slider/slider';
import { createСategories } from '../categories-list-item';
import { createMainMarkup } from '../../main';


const createEditableCard = data => {
  return data.reduce((acc, item) => {
    acc += `<li class="category-card sliders-item" data-category="${item.category}" data-callid="${item._id}">
  <img class="category-card__img" src="${item.imageUrls[0]}" alt="photo ${item.title}">
  <p class="category-card__name">${item.title}</p>
  <div class="category-card__prices">
      <p class="category-card__price--new">${item.price} €</p>
      <button type="button" data-editablebtn="editBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
  </div>
</li>`;
    return acc;
  }, '');
};

export const openByCategory = async (data, editable = false) => {
  const byCategoryRef = document.querySelector('.categories-container');
  document.querySelector('.slider-container').innerHTML = '';
  let i = 12;
  const markup = `<section class="by-category">
            <div class="by-categories__container">
                <ul class="by-categories__list">
               ${(editable) ? createEditableCard(data.slice(0, i)) : itemTemplate(data.slice(0, i))}
                </ul>
                ${
                  data.length > 12
                    ? `<button type="button" class="by-categories__btn">Загрузить ещё</button>`
                    : ''
                }
            </div>
        </section>`;

  byCategoryRef.innerHTML = markup;

  const btnByCategoryRef = document.querySelector('.by-categories__btn');
  const itemsByCategoryRef = document.querySelector('.by-categories__list');
  const categoriesList = document.querySelector('.categories-filter');
  data.length > 12 &&
    btnByCategoryRef.addEventListener('click', () => {
      const markup = itemTemplate(data.slice(i, (i += 12)));
      itemsByCategoryRef.insertAdjacentHTML('beforeend', markup);
      if (i > data.length) {
        btnByCategoryRef.textContent = 'Вернуться на главную страницу';
        btnByCategoryRef.addEventListener('click', () => {
          createMainMarkup();
          createСategories();
          getSliderItems();
          const activeCategory = categoriesList.querySelector(
            '.active-category',
          );
          activeCategory && activeCategory.classList.toggle('active-category');
          window.scrollTo({
            top: document.documentElement.offsetHeight - 2400,
            behavior: 'smooth',
          });
        });
      }
    });
};
