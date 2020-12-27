import './styles.css';
import { data } from '../../../data/data';
import itemTemplate from '../categories-list-item/template/category.hbs';
import { getCategories, getCategoriesSpecific } from '../../../api/api';



export const openByCategory = async (data) => {
    const byCategoryRef = document.querySelector('.main');
    let i = 12;
    const markup =
        `<section class="by-category">
            <div class="by-categories__container">
                <ul class="by-categories__list">
                ${itemTemplate(data.slice(0, i))}
                </ul>
                <button type="button" class="by-categories__btn">Загрузить ещё</button>
            </div>
        </section>`;
    byCategoryRef.insertAdjacentHTML('afterend', markup);
       
    const btnByCategoryRef = document.querySelector('.by-categories__btn');
    const itemsByCategoryRef = document.querySelector('.by-categories__list');
    const sectionCategoryRef = document.querySelector('.by-category');
    
    btnByCategoryRef.addEventListener('click', () => {
        const markup = itemTemplate(data.slice(i, i+=12));
        itemsByCategoryRef.insertAdjacentHTML('beforeend', markup)
        if (i > data.length) { 
            btnByCategoryRef.textContent = 'Вернуться на главную страницу';
            btnByCategoryRef.addEventListener('click', () => {
                byCategoryRef.style.display = 'block';
                sectionCategoryRef.style.display = 'none';
            });
            
        };
        
    });
}
