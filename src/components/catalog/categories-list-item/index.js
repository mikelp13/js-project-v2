import './styles.css';
import categoryTemplate from './template/category.hbs';
import сategoriesArray from './arrayCat';

const categoryRefs = document.querySelectorAll('.category-list');

function createСategories() {
    const markupProperty=categoryTemplate(сategoriesArray.filter(category => category.category === 'property'));
    categoryRefs[0].insertAdjacentHTML('afterbegin', markupProperty);
    
    const markupTransport = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));
    categoryRefs[1].insertAdjacentHTML('afterbegin', markupTransport);

    const markupWork = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport')); // Работа
    categoryRefs[2].insertAdjacentHTML('afterbegin', markupWork);
    
    const markupElect = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Электроника
    categoryRefs[3].insertAdjacentHTML('afterbegin', markupElect);

    const markupBusiness = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Бизнес услуги
    categoryRefs[4].insertAdjacentHTML('afterbegin', markupBusiness);

    const markupSport = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport')); // Отдых  и спорт
    categoryRefs[5].insertAdjacentHTML('afterbegin', markupSport);

    const markupFree = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Отдам бесплатно
    categoryRefs[6].insertAdjacentHTML('afterbegin', markupFree);

    const markupTrade = categoryTemplate(сategoriesArray.filter(category => category.category === 'transport'));  // Обмен
    categoryRefs[7].insertAdjacentHTML('afterbegin', markupTrade);

}
createСategories();


// const getСategory = async () => { 
//     return await fetch('https://callboard-backend.herokuapp.com/call/specific/transport')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//     })
// }
// getСategory();

// fetch==========================================================================================================

// let addCategoryProperty;

// const getСategoryProperty = async () => { 
//     return await fetch('https://callboard-backend.herokuapp.com/call/specific/property')
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             addCategoryProperty = [...data];
//         })
// }

// const createСategoryProperty = async () => {
//     await getСategoryProperty();
//     // console.log(addCategoryProperty);
//     const markup = categoryTemplate(addCategoryProperty);
//     categoryRefs[0].insertAdjacentHTML('afterbegin', markup);
//     console.log('markup category ready Property');
// }
// createСategoryProperty();

// ================================================================================================================



$(window).on( 'load', function () {
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
        
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
      
    });
});

$(window).on('load', function() {
    // console.log( "slider ready!" );
});

