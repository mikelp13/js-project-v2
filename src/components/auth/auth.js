import axios from 'axios';
import validator from 'validator';
import './auth.css';
import signUp from './template/signUp.hbs';
import logOut from './template/logOut.hbs';
import userLogged from './template/userLogged.hbs';
import login from './template/login.hbs'
import { modalBackDrop } from '../modal/modalBackDrop';
import { data } from '../../data/data';
import { CreateCabinetMarkup } from './accCabinet';
import mistakes from './template/mistakes.hbs';

const url = 'https://callboard-backend.herokuapp.com';

let user = {
    email: '',
    password: '',
};



const container = document.querySelector('.modal');

const headerAuthMobile = document.querySelector('.header-auth-mobile');
const headerAuth = document.querySelector('.header-auth');


// ===========================ОТРИСОВКА БЛОКА ВХОД/РЕГИСТРАЦИЯ=======================

// =====================================NEW USER==================================
function newUserEnter() {
    if (!localStorage.getItem('accessToken')) {
        data.auth.accessToken = '';
        data.auth.isAuth = false;

        const screenChng = () => {
            if (window.innerWidth < 768) {
                headerAuthMobile.innerHTML = login();
            };
            if (window.innerWidth > 768) {
                headerAuth.innerHTML = login();
            };

            const signUpHeader = document.querySelector('#signUpHeader');
            const signInHeader = document.querySelector('#signInHeader');

            signUpHeader.addEventListener('click', onHeaderSignUp);
            signInHeader.addEventListener('click', onHeaderSignUp);
        };

        screenChng();
        window.addEventListener('resize', screenChng);

    } else { loggedUserEnter() };

};

// ==========================================LOGGED USER==========================
function loggedUserEnter() {
    if (localStorage.getItem('accessToken')) {
        data.auth.isAuth = true;
        data.auth.accessToken = localStorage.getItem('accessToken')


        const screenChng = () => {
            if (window.innerWidth < 767) {
                headerAuthMobile.innerHTML = userLogged();
            };
            if (window.innerWidth > 768) {
                headerAuth.innerHTML = userLogged();
            };

            const loggedUserCarts = document.querySelector('#loggedUser__carts');
            const loggedUserExit = document.querySelector('#loggedUser__exit');
            loggedUserExit.addEventListener('click', logOutForm);
            loggedUserCarts.addEventListener('click', CreateCabinetMarkup);
        };

        screenChng();
        window.addEventListener('resize', screenChng);

    } else { newUserEnter() };

};


window.addEventListener('DOMContentLoaded', loggedUserEnter);
window.addEventListener('DOMContentLoaded', newUserEnter);



// ==================================МОДАЛКА ВЫХОДА==========================================

function logOutForm() {
    modalBackDrop(logOut());

    const btnXcls = document.querySelector('.authForm__btn_cls');
    const authFormLogOut = document.querySelector('.authForm__btn_logOut');
    const authFormExit = document.querySelector('.authForm__btn_exit');

    authFormLogOut.classList.add('active')

    const onXclose = () => {
        container.classList.remove('is-open');
    };
    btnXcls.addEventListener('click', onXclose);
    authFormExit.addEventListener('click', onXclose);

    authFormLogOut.addEventListener('click', logOutUser);
};

// ==================================ЗАЧИСТКА ЮЗЕРА===============================
function logOutUser() {
    localStorage.removeItem('accessToken');
    data.auth.accessToken = '';
    data.auth.isAuth = false;
    newUserEnter();
    container.classList.remove('is-open');
    CreateCabinetMarkup();

};

// =================================РЕГИСТРАЦИЯ/ВХОД===================================

export function onHeaderSignUp(e) {
    modalBackDrop(signUp());

    const authForm = document.forms.authForm;

    const onXclose = () => {
        container.classList.remove('is-open');
    };
    const btnXcls = authForm.close;
    btnXcls.addEventListener('click', onXclose)

    if (e.target.dataset.btn === 'signup') {
        authForm.logIn.classList.remove('active');
        authForm.signUp.classList.add('active');
    } else if (e.target.dataset.btn === 'signin') {
        authForm.signUp.classList.remove('active');
        authForm.logIn.classList.add('active');
    }


    const gatherInfo = () => {
        return user = {
            email: authForm.email.value,
            password: authForm.password.value,
        };
    };

    const onSignUpBtn = async() => {
        try {
            authForm.logIn.classList.remove('active');
            authForm.signUp.classList.add('active');
            const result = await axios.post(`${url}/auth/register`, {...user });
            authForm.signUp.classList.remove('active');
            authForm.logIn.classList.add('active');
            onLogInBtn();
        } catch (error) {
            modalBackDrop(mistakes())
            const mistake = document.querySelector('.mistake');
            mistakes.textContent = error;
        }
    };

    const onLogInBtn = async() => {
        try {
            authForm.signUp.classList.remove('active');
            authForm.logIn.classList.add('active');
            const result = await axios.post(`${url}/auth/login`, {...user });
            localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
            data.user = {...result.data.user }
            data.auth.accessToken = result.data.accessToken;
            data.auth.isAuth = true;
            onXclose();
            loggedUserEnter();
        } catch (err) {
            console.log(err);
        }

    };


    const checkSubmit = (event) => {
        event.preventDefault()
        if (event.submitter === authForm.logIn) {
            onLogInBtn();
        };
        if (event.submitter === authForm.signUp) {
            onSignUpBtn();
        };
    };

    authForm.addEventListener('submit', checkSubmit);
    authForm.addEventListener('input', gatherInfo);
};





//         // const mistakeEmail = authForm.querySelector('.mistake__email');
//         // const mistakePassword = authForm.querySelector('.mistake__password');
//         // const options = { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

//         // if (validator.isEmail(authForm.email.value)) {
//         //     mistakeEmail.textContent = '';
//         //     user.email = authForm.email.value;
//         // } else { mistakeEmail.textContent = "gadkiy ya"
//         // };
//         // if (validator.isStrongPassword(authForm.password.value, options)) {
//         //     mistakePassword.textContent = '';
//         //     user.password= authForm.password.value;
//         // } else { mistakePassword.textContent = "gadkiy ty"
//         // };
//         // return user