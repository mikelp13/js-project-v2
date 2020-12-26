import axios from 'axios';
import validator from 'validator';
import './auth.css';
import signUp from './template/signUp.hbs';
import logOut from './template/logOut.hbs';
// import userLogged from './template/userLogged.hbs';
// import login from './template/login.hbs'
import { modalBackDrop } from '../modal/modalBackDrop';
import { data } from '../../data/data'; <<
<< << < HEAD
import { CreateCabinetMarkup } from './accCabinet'; ===
=== =
// import {CreateCabinetMarkup} from './accCabinet';
>>>
>>> > bd3b340e89e03918bd919f5db447f673d546e157
import mistakes from './template/mistakes.hbs';

const url = 'https://callboard-backend.herokuapp.com';

let user = {
    email: '',
    password: '',
};

// const container = document.querySelector('.modal');
// headerAuthMobile.classList.add('modal')
// headerAuth.classList.add('modal')

const headerAuthMobile = document.querySelector('.header-auth-mobile');
const headerAuth = document.querySelector('.header-auth');

const authNewUser = document.querySelector('.authNewUser');
const authLoggedUser = document.querySelector('.authLoggedUser');
const authNewUserMobile = document.querySelector('.authNewUser__mobile');
const authLoggedUserMobile = document.querySelector('.authLoggedUser__mobile');

const logInAuthMobile = document.querySelector('.logInAuth__mobile');
const signUpAuthMobile = document.querySelector('.signUpAuth__mobile');
const myCabAuthMobile = document.querySelector('.myCabAuth__mobile');
const exitCabAutMobile = document.querySelector('.exitCabAut__mobile');

const logInAuth = document.querySelector('.logInAuth');
const signUpAuth = document.querySelector('.signUpAuth');
const myCabAuth = document.querySelector('.myCabAuth');
const exitCabAut = document.querySelector('.exitCabAut');

const cabMenu = document.querySelector('.acc-cabinet-menu');
const cabMenuMobile = document.querySelector('.acc-cabinet-menu__mobile')

// ===========================ОТРИСОВКА БЛОКА ВХОД/РЕГИСТРАЦИЯ=======================

// =========================HEADER & MOBILE=====================================

const resizeWindow = () => {

    authNewUser.classList.add('nonAuth');
    authLoggedUser.classList.add('nonAuth');
    authNewUserMobile.classList.add('nonAuth');
    authLoggedUserMobile.classList.add('nonAuth');
    cabMenu.classList.add('nonAuth');
    cabMenuMobile.classList.add('nonAuth');

    if (window.innerWidth < 767) {
        if (!localStorage.getItem('accessToken')) {
            authNewUserMobile.classList.remove('nonAuth');
            newUserEnter();
        };
        if (localStorage.getItem('accessToken')) {
            authLoggedUserMobile.classList.remove('nonAuth');
            loggedUserEnter();
        };
        return;
    };
    if (window.innerWidth >= 768) {
        if (!localStorage.getItem('accessToken')) {
            authNewUser.classList.remove('nonAuth');
            newUserEnter();
        };
        if (localStorage.getItem('accessToken')) {
            authLoggedUser.classList.remove('nonAuth');
            loggedUserEnter();
        };
        return;
    };
}

window.addEventListener('load', resizeWindow);
window.addEventListener('resize', resizeWindow);

function newUserEnter() {
    data.auth.accessToken = '';
    data.auth.isAuth = false;
    // console.log('newUser', data.auth.isAuth, data.auth.accessToken);
};

function loggedUserEnter() {
    data.auth.isAuth = true;
    data.auth.accessToken = localStorage.getItem('accessToken');
    // console.log('loggedUser', data.auth.isAuth, data.auth.accessToken);
};

// ================================REGISTRATION===================================
function regitsrationUser(event) {
    modalBackDrop(signUp());


    // headerAuthMobile.classList.add('modal')
    // headerAuth.classList.add('modal')
    const container = document.querySelector('.modal');


    const authForm = document.forms.authForm;

    if (event.target.dataset.btn === 'signup') {
        authForm.logIn.classList.remove('active');
        authForm.signUp.classList.add('active');
    } else if (event.target.dataset.btn === 'signin') {
        authForm.signUp.classList.remove('active');
        authForm.logIn.classList.add('active');
    };

    const onXclose = () => {
        container.classList.remove('is-open');
        btnXcls.removeEventListener('click', onXclose);
    };
    const btnXcls = authForm.close;
    btnXcls.addEventListener('click', onXclose);



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
        } catch (err) {
            console.log(err)
        }
    };

    const onLogInBtn = async() => {
        try {
            authForm.signUp.classList.remove('active');
            authForm.logIn.classList.add('active');
            const result = await axios.post(`${url}/auth/login`, {...user });
            localStorage.setItem('accessToken', JSON.stringify(`Bearer ${result.data.accessToken}`));
            data.user = {...result.data.user }
            data.auth.accessToken = result.data.accessToken;
            data.auth.isAuth = true;
            onXclose();
            resizeWindow()
            authForm.removeEventListener('submit', checkSubmit);
            authForm.removeEventListener('input', gatherInfo);
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
// ============================MISTAKES=============================

// ============================MY CABINET=========================================

function onCabPress() {
    if (!authLoggedUserMobile.classList.contains('nonAuth')) {
        if (cabMenuMobile.classList.contains('nonAuth')) {
            cabMenuMobile.classList.remove('nonAuth')
        } else { cabMenuMobile.classList.add('nonAuth') }
    };
    if (!authLoggedUser.classList.contains('nonAuth')) {
        if (cabMenu.classList.contains('nonAuth')) {
            cabMenu.classList.remove('nonAuth')
        } else { cabMenu.classList.add('nonAuth') }
    };
};

// ============================EXIT CABINET====================================
function onCabExit() {
    modalBackDrop(logOut());
    const container = document.querySelector('.modal');

    const btnXcls = document.querySelector('.authForm__btn_cls');
    const authFormLogOut = document.querySelector('.authForm__btn_logOut');
    const authFormExit = document.querySelector('.authForm__btn_exit');

    if (!cabMenuMobile.classList.contains('nonAuth')) {
        cabMenuMobile.classList.add('nonAuth');
    };
    if (!cabMenu.classList.contains('nonAuth')) {
        cabMenu.classList.add('nonAuth');
    };

    authFormLogOut.classList.add('active')

    const onXclose = () => {
        container.classList.remove('is-open');
        btnXcls.removeEventListener('click', onXclose);
        authFormExit.removeEventListener('click', onXclose);
    };
    btnXcls.addEventListener('click', onXclose);
    authFormExit.addEventListener('click', onXclose);

    function logOutUser() {
        localStorage.removeItem('accessToken');
        data.auth.accessToken = '';
        data.auth.isAuth = false;
        resizeWindow();
        container.classList.remove('is-open');
        authFormLogOut.removeEventListener('click', logOutUser);
    }

    authFormLogOut.addEventListener('click', logOutUser);
};


logInAuth.addEventListener('click', regitsrationUser);
signUpAuth.addEventListener('click', regitsrationUser);
myCabAuth.addEventListener('click', onCabPress);
exitCabAut.addEventListener('click', onCabExit);
logInAuthMobile.addEventListener('click', regitsrationUser);
signUpAuthMobile.addEventListener('click', regitsrationUser);
myCabAuthMobile.addEventListener('click', onCabPress);
exitCabAutMobile.addEventListener('click', onCabExit);


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