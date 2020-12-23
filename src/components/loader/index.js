import './styles.css';

const buttonLoaderRef = document.querySelector('.loader__btn');
const downloaderRef = document.querySelector('.loader');
const categoryRef = document.querySelectorAll('.category');

buttonLoaderRef.addEventListener('click', loaderCategory);

function loaderCategory() {

    for (let i in categoryRef) {

        if (categoryRef[i].className === 'category unvisible') { 
            categoryRef[i].className = 'category visible';
            const categoryVisibleRef = document.querySelectorAll('.category.visible');
            if (categoryVisibleRef.length < 8) { return } else {
                buttonLoaderRef.className = 'loader__btn hide';
                downloaderRef.className = 'loader hide';
            }
            return;
        }

        
    };
    
}
