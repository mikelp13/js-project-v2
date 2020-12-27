function themSwitcher() {
    // ===================================REFS==================================
    const orangeBtn = document.querySelector('.orange-btn');
    const blueBtn = document.querySelector('.blue-btn');
    const html = document.getElementsByTagName('html')[0];
    const headerLogo = document.querySelector(".logo-orange");
    const headerLogoMobile = document.querySelector(".logo-orange-mobile");
    const closeMenu = document.querySelector('.close-menu-orange')
    const mobileBurger = document.querySelector('.mobile-burger-orange')
    const mobileFilterBtn = document.querySelector('.header__filters--btn-orange')
    const mobileClearFilterBtn = document.querySelector('.header__clear-filter--btn-orange')
    const filterBtn = document.querySelector('.header__btn-orange')
    const clearFilterBtn = document.querySelector('.header__clear-btn-orange')
    const tabletInputBtn = document.querySelector('.tablet-input-btn-orange')
    const deskInputBtn = document.querySelector('.desk-input-btn-orange')
    const logedUserCard = document.querySelector('.loggedUser__carts-orange')
    const exitUserCard = document.querySelector('.loggedUser__exit-orange')
    const mobilelogedUserCard = document.querySelector('.mobile-loggedUser__carts-orange')
    const mobileexitUserCard = document.querySelector('.mobile-loggedUser__exit-orange')
    const mobileSearch = document.querySelector('.mobile-search')
    // ===================================REFS==================================
    // =================================LISTENERS==============================
    orangeBtn.addEventListener('change', () => {
        if(orangeBtn.checked) {
        html.style.setProperty("--main-accent-color", "#00bcd4");
        headerLogo.classList.toggle("blue");
        headerLogoMobile.classList.toggle("blue");
        closeMenu.classList.toggle("close-menu-blue");
        mobileBurger.classList.toggle("mobile-burger-blue");
        mobileFilterBtn.classList.toggle("header__filters--btn-blue");
        mobileClearFilterBtn.classList.toggle("header__clear-filter--btn-blue");
        filterBtn.classList.toggle("header__filters--btn-blue");
        clearFilterBtn.classList.toggle("header__clear-filter--btn-blue");
        tabletInputBtn.classList.toggle("search-input-btn-blue");
        deskInputBtn.classList.toggle("search-input-btn-blue");
        logedUserCard.classList.toggle("loggedUser__carts-blue");
        exitUserCard.classList.toggle("loggedUser__exit-blue");
        mobilelogedUserCard.classList.toggle("loggedUser__carts-blue");
        mobileexitUserCard.classList.toggle("loggedUser__exit-blue");
        mobileSearch.classList.toggle("mobile-search-blue");
        } else {
        html.style.setProperty("--main-accent-color", "#ff6b08");
        headerLogo.classList.remove("blue");
        headerLogoMobile.classList.remove("blue");
        closeMenu.classList.remove("close-menu-blue");
        mobileBurger.classList.remove("mobile-burger-blue");
        mobileFilterBtn.classList.remove("header__filters--btn-blue");
        mobileClearFilterBtn.classList.remove("header__clear-filter--btn-blue");
        filterBtn.classList.remove("header__filters--btn-blue");
        clearFilterBtn.classList.remove("header__clear-filter--btn-blue");
        tabletInputBtn.classList.remove("search-input-btn-blue");
        deskInputBtn.classList.remove("search-input-btn-blue");
        logedUserCard.classList.remove("loggedUser__carts-blue");
        exitUserCard.classList.remove("loggedUser__exit-blue");
        mobilelogedUserCard.classList.remove("loggedUser__carts-blue");
        mobileexitUserCard.classList.remove("loggedUser__exit-blue");
        mobileSearch.classList.toggle("mobile-search-blue");
        }
    })
}
themSwitcher()
