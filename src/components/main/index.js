import mainTpl from './templates/mainTpl.hbs';

export const createMainMarkup = () => {
  const main = document.querySelector('.categories-container');
  main.innerHTML = mainTpl();
};
