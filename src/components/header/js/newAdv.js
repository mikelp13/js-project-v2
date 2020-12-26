import { createNewAdv } from '../../ads/newAddForm/newAddForm';
import { modalBackDrop } from '../../modal/modalBackDrop';
import newAddForm from '../../ads/newAddForm/newAddForm.hbs';
import { data } from '../../../data/data';


const buttonNewAdv = document.querySelector('.header__create-ad-btn');
let registered;

const createAdv = (e) => {
    console.log('Make your new adv');
    createNewAdv(e);
}

const goToRegistrationForm = (e) => {
    console.log('You need to fill the registration form');
    regitsrationUser(e);
}

const checkRegistered = (e) => {
    registered = localStorage.getItem('accessToken');
    modalBackDrop(newAddForm());
    // createNewAdv();
    createNewAdv(data.calls.specificCategory.property[39]);
    // registered ? createAdv() : goToRegistrationForm(e);
}

buttonNewAdv.addEventListener('click', checkRegistered)