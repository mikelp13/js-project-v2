const orangeBtn = document.querySelector('.orange-btn');
const blueBtn = document.querySelector('.blue-btn');
const html = document.getElementsByTagName('html')[0];

const logetUserIcon = document.querySelectorAll('#loggedUser__exit:hover')
console.log(logetUserIcon);

blueBtn.addEventListener('change', () => {
    // html.setAttribute("style", "--user-exit-color: url(./components/header/images/logout-blue.svg)");
    // html.style.setProperty("--logo-color", "url(./components/header/images/magic-logo/header-magic-logo-blue.svg)");
    html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
    // html.style.setProperty("--main-accent-color", "#00bcd4");
})

orangeBtn.addEventListener('change', () => {
    html.style.setProperty("--main-accent-color", "#ff6b08");
})

//   --user-exit-color: url(./components/header/images/logout-orange.svg);
//   --user-cards-color: url(./components/header/images/user-profile-orange.svg);
//   --burger-menu-color: url(./components/menu/icons/dehaze-24px-orange.svg);
//   --clear-mobile-color: url(./components/refresh-filtres/restore/replay-24px-orange.svg);
//   --filters-mobile-color: url(./components/refresh-filtres/filters/tune-24px-orange.svg);
//   --close-color: url(./components/header/images/close/close-24px-orange.svg);
//   --search-color: url(./components/search/icons/search-24px-orange.svg);
//   --logo-color: url(./components/header/images/magic-logo/header-magic-logo.svg);




// function colorSwither() {
//     if (blueBtn.check) {
//         return html.style.setProperty("--main-accent-color", "#00bcd4");
//     }
// }
// colorSwither()