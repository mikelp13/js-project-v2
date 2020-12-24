import './styles.css';
import { data } from "../../../data/data";
// import { getCategories } from '../../../api/api';
// import { getCategoriesSpesific } from '../../../api/api';
import categoryTemplate from './template/category.hbs';
// import сategoriesArray from './arrayCat';
import { runLoader } from '../../loader/index';





export const createСategories = () => {
    const categoryRefs = document.querySelector('.container-categories');

    for (let i = 0; i < 4; i += 1) {

        const markup = `    <div class="category visible">
    <div class="category-header">
        <h2 class="category-title">${data.calls.categories[i]}</h2>
        <a href="" class="category-link" data-category="category">Смотреть все</a>
    </div>
    <ul class="category-list sliders"> ${categoryTemplate(data.calls.specificCategory[data.calls.categories[i]].slice(0,10))} </ul> </div>`
        categoryRefs.insertAdjacentHTML('afterbegin', markup);
        data.renderedCategories.push(data.calls.categories[i]);
    }

    



        $('.sliders').slick({
            dots: true,
            variableWidth: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            speed: 500,
            easing: 'ease',
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3500, 
        });



    runLoader();


    // const markupTransport = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));
    // categoryRefs[1].insertAdjacentHTML('afterbegin', markupTransport);

    // const markupWork = categoryTemplate(сategoriesArray.filter(category => category.category === 'work')); // Работа
    // categoryRefs[2].insertAdjacentHTML('afterbegin', markupWork);

    // const markupElect = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Электроника
    // categoryRefs[3].insertAdjacentHTML('afterbegin', markupElect);

    // const markupBusiness = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Бизнес услуги
    // categoryRefs[4].insertAdjacentHTML('afterbegin', markupBusiness);

    // const markupSport = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport')); // Отдых  и спорт
    // categoryRefs[5].insertAdjacentHTML('afterbegin', markupSport);

    // const markupFree = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Отдам бесплатно
    // categoryRefs[6].insertAdjacentHTML('afterbegin', markupFree);

    // const markupTrade = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Обмен
    // categoryRefs[7].insertAdjacentHTML('afterbegin', markupTrade);



}



// from API============================================================

// const getInitialData = () => {
//     getCategories()
//         .then(data => console.log('InintialData Categories:',[...data]));
//     getCategoriesSpesific()
//         .then(data => console.log('InintialData Category Specific:', [...data]));
// };
// getInitialData();



// const getInitialData = async () => {
//     await getCategories();

//     getCategoriesSpesific(data.calls.categories[0]);
//     getCategoriesSpesific(data.calls.categories[1]);
//     getCategoriesSpesific(data.calls.categories[2]);
//     getCategoriesSpesific(data.calls.categories[3]);

//   data.renderedCategories.push(
//     data.calls.categories[0],
//     data.calls.categories[1],
//   );
//   console.log(data);
//   setTimeout(() => {
//     getMore();
//   }, 5000);
// };
// getInitialData();

// const getMore = async () => {
//   await getCategoriesSpesific(data.calls.categories[data.renderedCategories.length]);
//   data.renderedCategories.push(
//     data.calls.categories[data.renderedCategories.length],
//   );
//   console.log(data);
// };


// =============================================================================
// const getСategory = async () => { 
//     return await fetch('https://callboard-backend.herokuapp.com/call/specific/work')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//     })
// }
// getСategory();
// ===============================================================================



