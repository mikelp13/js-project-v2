import { createNewAdv } from "../../ads/newAddForm/newAddForm";
import { modalBackDrop } from "../../modal/modalBackDrop";
import newAddForm from "../../ads/newAddForm/newAddForm.hbs";
//
import { data } from "../../../data/data";


const newAdv = document.querySelector('.header__create-ad-btn');
let registered;


const createAdv = () => {
    console.log('Make your new adv');
    // modalBackDrop(createNewAdv())
    // Добавить модальное окно "Создать объявление"
}


const goToRegistrationForm = () => {
    console.log('You need to fill the registration form');
    // Добавить модальное окно "Зарегистрироваться"
    registered = true;
    localStorage.setItem('isAuth', JSON.stringify(registered));

}

const addNewAdv = () => {
    // registered ? createAdv() : goToRegistrationForm();
    modalBackDrop(newAddForm())
    createNewAdv(data.calls.specificCategory.transport[0])
}


newAdv.addEventListener('click', addNewAdv)