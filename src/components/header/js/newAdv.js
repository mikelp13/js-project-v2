const newAdv = document.querySelector('.header__create-ad-btn');
let registered;


const createAdv = () => {
    console.log('Make your new adv');

    // Добавить модальное окно "Создать объявление"
}


const goToRegistrationForm = () => {
    console.log('You need to fill the registration form');
    // Добавить модальное окно "Зарегистрироваться"
    registered = true;
    localStorage.setItem('isAuth', JSON.stringify(registered));

}

const addNewAdv = () => {
    registered ? createAdv() : goToRegistrationForm();
}


newAdv.addEventListener('click', addNewAdv)