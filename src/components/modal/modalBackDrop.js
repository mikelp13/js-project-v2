import './styles.css';

export const modalBackDrop = templation => {
    const container = document.querySelector('.modal');
    const createModalMarkup = (closeModal) => { return `${templation}`; };

    const closeModal = () => {
        container.classList.remove('is-open');
        container.addEventListener('click', close);
        document.removeEventListener('keydown', escBtnPress);
    };

    const close = event => {
        if (event.currentTarget === event.target) { closeModal() }
    };

    const escBtnPress = event => {
        if (event.code === 'Escape') { closeModal() }
    };

    container.innerHTML = createModalMarkup();
    container.classList.add('is-open');
    container.addEventListener('click', close);
    document.addEventListener('keydown', escBtnPress);

    return closeModal;
};