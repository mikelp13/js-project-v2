import mainTpl from './templates/mainTpl.hbs';

export const createMainMarkup = () => {
  const main = document.querySelector('.main');
  main.innerHTML = mainTpl();
};
