import { getCategoriesSpecific } from '../../../api/api';
import { createCategoriesMarkup } from '../../../utils/categories';
import { openByCategory } from '../../catalog/categories-list';
import { createСategories } from '../../catalog/categories-list-item';
import { getSliderItems } from '../../hero/slider/slider';
import { createMainMarkup } from '../../main';
import categories from '../templates/categories.hbs';

export const refreshMain = (hero = true) => {
  createMainMarkup();
  createСategories();
  hero && getSliderItems();
  const activeCategory = document
    .querySelector('.categories-filter')
    .querySelector('.active-category');
  activeCategory && activeCategory.classList.toggle('active-category');
  const tabletFilters = document.querySelector('.categories-filter-tablet');
  tabletFilters && (tabletFilters.style.display = 'none');

  const burgerWrapper = document.querySelector('.mobile-menu-closed');
  burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
};

export const createHeader = () => {
  const categoriesList = document.querySelector('.categories-filter');
  categoriesList.insertAdjacentHTML('beforeend', createCategoriesMarkup());
  const categoriesTabletList = document.querySelector(
    '.categories-filter-tablet',
  );
  const categoriesMobileList = document.querySelector(
    '.categories-filter-mobile',
  );
  // ===========================REFS===================================

  const mobileFilters = document.querySelector('.categories-filter-mobile');
  const mobileFiltersBtn = document.querySelector('.mobile-filters-wrapper');
  const tabletFilters = document.querySelector('.categories-filter-tablet');
  const filterBtn = document.querySelector('.filters-wrapper');
  const mobileInputBtn = document.querySelector('.mobile-search');
  const mobileInput = document.querySelector('.mobile-input-closed');
  const mobileInputClose = document.querySelector('.mobile-input-cross');
  const mobileInputSearch = document.querySelector('.mobile-input-btn');
  const mobileHeaderLogo = document.querySelector('.header__logo');
  const menuBtnRef = document.querySelector('.mobile-burger');
  const mobileMenuRef = document.querySelector('.mobile-menu-closed');
  const mobileCloseRef = document.querySelector('.close-menu');
  const clearCategoryBtn = document.querySelector('.clear-filters-wrapper');
  const clearCategoryMobileBtn = document.querySelector(
    '.mobile-clear-filters-wrapper',
  );

  // ===========================MOBILE FILTER OPEN-CLOSE===============
  function openMobileFilters() {
    if (mobileFilters.innerHTML === '') {
      mobileFilters.innerHTML = createCategoriesMarkup();
    } else {
      mobileFilters.innerHTML = '';
    }
  }
  mobileFiltersBtn.addEventListener('click', openMobileFilters);

  // ===========================TABLET FILTER OPEN-CLOSE================
  const mediaTabletMin = window.matchMedia('(min-width: 768px)');
  const mediaTabletMax = window.matchMedia('(max-width: 1279px)');

  function tabletCategoriesOpen() {
    if (tabletFilters.innerHTML === '') {
      tabletFilters.style.display = 'flex';
      tabletFilters.innerHTML = createCategoriesMarkup();
    } else {
      tabletFilters.style.display = 'none';
      tabletFilters.innerHTML = '';
    }
  }
  filterBtn.addEventListener('click', tabletCategoriesOpen);

  // ===========================MOBILE INPUT OPEN-CLOSE==================
  function mobileInputOpen() {
    mobileInputBtn.addEventListener('click', () => {
      mobileInput.classList.toggle('mobile-input');
      mobileInputSearch.style.display = 'unset';
      mobileInputClose.style.display = 'unset';
      mobileHeaderLogo.style.display = 'none';
    });
    mobileInputClose.addEventListener('click', () => {
      mobileInput.classList.toggle('mobile-input');
      mobileInputSearch.style.display = 'none';
      mobileInputClose.style.display = 'none';
      mobileHeaderLogo.style.display = 'unset';
    });
  }
  mobileInputOpen();

  // ===========================MOBILE MENU OPEN-CLOSE==================
  function menuOpen() {
    menuBtnRef.addEventListener('click', () => {
      mobileMenuRef.classList.toggle('mobile-menu-opened');
    });
    mobileCloseRef.addEventListener('click', () => {
      mobileMenuRef.classList.toggle('mobile-menu-opened');
    });
  }
  menuOpen();

  // ===========================ACTIVE CATEGORY===========================

  function activeCategory(e) {
    if (e.target.nodeName === 'A') {
      // clearActiveCategory();
      renderCategory(e);
      document.querySelector('.slider-container').innerHTML = '';
      const burgerWrapper = document.querySelector('.mobile-menu-closed');
      burgerWrapper && burgerWrapper.classList.remove('mobile-menu-opened');
      if (e.target.classList.contains('active-category')) {
        return;
      }
      const activeCategory = document.querySelector('.active-category');
      activeCategory && activeCategory.classList.remove('active-category')
      e.target.classList.add('active-category');
      e.target.classList.add('orange');
    }
  }

  categoriesList.addEventListener('click', activeCategory);
  categoriesTabletList.addEventListener('click', activeCategory);
  categoriesMobileList.addEventListener('click', activeCategory);
  clearCategoryBtn.addEventListener('click', () => {
    clearActiveCategory(true);
  });
  clearCategoryMobileBtn.addEventListener('click', () => {
    clearActiveCategory(true);
  });

  function clearActiveCategory(hero = false) {
    if (document.querySelector('.active-category')) {
      let activeCategoryATM = document.querySelector('.active-category');
      activeCategoryATM &&
        activeCategoryATM.classList.remove('active-category');
    }
    refreshMain(hero);
  }
  // ===========================FILTER-BTN===========================

  const navigation = document.querySelector('.categories-filter');

  const renderCategory = async event => {
    const category = event.target.closest('[data-category]').dataset.category;
    openByCategory(await getCategoriesSpecific(category));
  };

  navigation.addEventListener('click', renderCategory);
};
