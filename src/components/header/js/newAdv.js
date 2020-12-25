import { newAdv } from '../../ads/newAddForm/newAddForm.js'
import { onHeaderSignUp } from '../../../components/auth/auth.js'

const buttonNewAdv = document.querySelector('.header__create-ad-btn');
let registered;

const createAdv = () => {
    console.log('Make your new adv');
    newAdv();
}

const goToRegistrationForm = (e) => {
    console.log('You need to fill the registration form');
    onHeaderSignUp(e);
}

const checkRegistered = (e) => {
    registered = localStorage.getItem('accessToken');
    registered ? createAdv() : goToRegistrationForm(e);
}

buttonNewAdv.addEventListener('click', checkRegistered)