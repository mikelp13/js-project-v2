import { createNewAdv } from '../../ads/newAddForm/newAddForm';
import { modalBackDrop } from '../../modal/modalBackDrop';
import newAddForm from '../../ads/newAddForm/newAddForm.hbs';
import { regitsrationUser } from '../../auth/auth';


export const newAdv = () => {

    const buttonNewAdv = document.querySelector('.header__create-ad-btn');
    const buttonNewAdvMobile = document.querySelector('.main__create-ad-btn');

    let registered;

    const createAdv = () => {
        modalBackDrop(newAddForm());
        console.log('Make your new adv');
        createNewAdv();
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
    buttonNewAdvMobile.addEventListener('click', checkRegistered)
}