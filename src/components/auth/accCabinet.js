import accCabinet from './template/accCabinet.hbs';
const authWrapper = document.querySelector('.header-auth')
const authMobileWrapper = document.querySelector('.header-auth-mobile')
authWrapper.insertAdjacentHTML('beforebegin', accCabinet())
const cabinetMenu = document.querySelector('.acc-cabinet-menu')
authMobileWrapper.insertAdjacentHTML('afterbegin', accCabinet())   
export function CreateCabinetMarkup() {
    cabinetMenu.style.opacity = (cabinetMenu.style.opacity == '0') ? '1' : '0'
}