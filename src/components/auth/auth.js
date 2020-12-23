import axios from 'axios';
import validator from 'validator';
import './auth.css';
import signUp from './template/signUp.hbs';
import logOut from './template/logOut.hbs';
import userLogged from './template/userLogged.hbs';
import userDrop from './template/userDrop.hbs';
import login from './template/login.hbs'
import { modalBackDrop } from '../modal/modalBackDrop';
import { data } from '../../data/data';

const signUpHeader = document.querySelector('#signUpHeader');
const signUpDrop = document.querySelector('#signUpDrop');
const signInHeader = document.querySelector('#signInHeader');
const signInDrop = document.querySelector('#signInDrop');
const container = document.querySelector('.modal');


// ===============================HEADER==============================
const headerAuthMobile = document.querySelector('.header-auth-mobile');
const headerAuth = document.querySelector('.header-auth');
// console.log(headerAuthMobile);

const onLoadAuth = () => {
    if (localStorage.getItem('accessToken')) {
        data.auth.isAuth = true;
        data.auth.accessToken = localStorage.getItem('accessToken')

        headerAuth.innerHTML = userLogged()
        const loggedUserCarts = document.querySelector('#loggedUser__carts');
        const loggedUserExit = document.querySelector('#loggedUser__exit');



      loggedUserExit.addEventListener('click', logOutForm)
        // проверить почему 2 парі кавічек в токене 
        //и что Юра подтянет всю остальную инфу по клиенту

        console.log(data);
    } else {
        console.log(data);
    }

}
window.addEventListener('DOMContentLoaded', onLoadAuth);

// =========================================================================



const url = 'https://callboard-backend.herokuapp.com';

let user = {
    email: '',
    password: '',
};


// ================================SIGN UP=============================
const onHeaderSignUp = (e) => {
    modalBackDrop(signUp());
    const authForm = document.forms.authForm;

    const onXclose = () => {
        container.classList.remove('is-open');
    };

    const gatherInfo = () => {
        // const mistakeEmail = authForm.querySelector('.mistake__email');
        // const mistakePassword = authForm.querySelector('.mistake__password');
        // const options = { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
       
        // if (validator.isEmail(authForm.email.value)) {
        //     mistakeEmail.textContent = '';
        //     user.email = authForm.email.value;
        // } else { mistakeEmail.textContent = "gadkiy ya"
        // };
        // if (validator.isStrongPassword(authForm.password.value, options)) {
        //     mistakePassword.textContent = '';
        //     user.password= authForm.password.value;
        // } else { mistakePassword.textContent = "gadkiy ty"
        // };
        // return user

        return user = {
            email: authForm.email.value,
            password: authForm.password.value,
        };
        
    };
    
       
    if (e.target.dataset.btn === 'signup') {
        authForm.logIn.classList.remove('active');
        authForm.signUp.classList.add('active');
    } else if (e.target.dataset.btn === 'signin') {
        authForm.signUp.classList.remove('active');
        authForm.logIn.classList.add('active'); 
    }

    const onSubmitBtn = (e) => {
        e.preventDefault();
        gatherInfo();



        const onSignUpBtn = async (e) => {
            try {
                authForm.logIn.classList.remove('active');
                authForm.signUp.classList.add('active');
                const result = await axios.post(`${url}/auth/register`, { ...user });
                // loggedUser.signUpUser = { ...result.data };
                // loggedUser.isAuth = true;
                // console.log(loggedUser.signUpUser);
                authForm.signUp.classList.remove('active');
                authForm.logIn.classList.add('active');
                onLogInBtn();
                // container.classList.remove('is-open');
            } catch (error) {
             console.log('error', error.response.data);
            }
        };

        const onLogInBtn = async (e) => {
            try {
                authForm.signUp.classList.remove('active');
                authForm.logIn.classList.add('active');
                const result = await axios.post(`${url}/auth/login`, { ...user });
                data.user = { ...result.data.user }
                localStorage.setItem('accessToken', JSON.stringify(result.data.accessToken));
                data.auth.accessToken = result.data.accessToken;
                // console.log('data.auth.accessToken', data.auth.accessToken);
                data.auth.isAuth = true;
                headerAuth.innerHTML = userLogged();
                container.classList.remove('is-open');
            } catch (error) {
               console.dir(error);
            }
        };
        
        authForm.signUp.addEventListener('click', onSignUpBtn);
        authForm.logIn.addEventListener('click', onLogInBtn);
    };
    authForm.close.addEventListener('click', onXclose);
    authForm.addEventListener('submit', onSubmitBtn);
    authForm.addEventListener('input', gatherInfo);
};


signUpHeader.addEventListener('click', onHeaderSignUp);
signUpDrop.addEventListener('click', onHeaderSignUp);
signInHeader.addEventListener('click', onHeaderSignUp);
signInDrop.addEventListener('click', onHeaderSignUp);

// ====================================LOG OUT============================================

const logOutForm = () => {
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

    const logOutUser = () => {
        if (localStorage.getItem('accessToken')) {
            data.user = {};
            localStorage.removeItem('accessToken');
            data.auth.accessToken = '';
            data.auth.isAuth = false;
            headerAuth.innerHTML = login()
        };
        //выйти в стандартную форму хедера перед выходом из модалки
        console.log(data);

        container.classList.remove('is-open');
        
    };
    authFormLogOut.addEventListener('click', logOutUser);
};
// logOutForm()
