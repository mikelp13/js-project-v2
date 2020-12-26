import { createNewAdv } from '../../ads/newAddForm/newAddForm.js'
import { regitsrationUser } from '../../../components/auth/auth.js'

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
    registered ? createAdv() : goToRegistrationForm(e);
}

buttonNewAdv.addEventListener('click', checkRegistered)