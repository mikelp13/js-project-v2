import '../modal-window/dev-styles.css';
import SergeyVishnevskiy from '../img-portret/SergeyVishnevskiy.jpg';
import YuriiBerezynets from '../img-portret/YuriiBerezynets.jpg';
import MyhailoKovalchuk from '../img-portret/MyhailoKovalchuk.jpg';
import IrynaKosynienko from '../img-portret/IrynaKosynienko.jpg';
import AleksandrVlasiuk from '../img-portret/AleksandrVlasiuk.jpg';
import IrinaMaliugova from '../img-portret/IrinaMaliugova.jpg';
import TatianaUlrich from '../img-portret/TatianaUlrich.jpg';
import IgorVasylytsya from '../img-portret/IgorVasylytsya.jpg';
import KostyaPanasiuk from '../img-portret/KostyaPanasiuk.jpg';
import YuliyaChyzhkova from '../img-portret/YuliyaChyzhkova.jpg';
import vjuh from '../img-portret/vjuh.jpg';
import ValentinaManankova from '../img-portret/ValentinaManankova.jpg';

export const modalBackDrop = innerElement => {
  const body = document.querySelector('body');
  const container = document.querySelector('.modal');

  const createModalMarkup = closeModal => {
    return `
        <div class="student-modal">
        <h2 class="student-modal__form--title">Наша команда</h2>
      <button type="button" class="student-modal__close-btn"></button>
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${MyhailoKovalchuk}"
            alt="Михаил Ковальчук"
          />
        </div>
        <div class="students-modal-content">
          <h2>Михаил Ковальчук<br /><span>Team Lead</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${AleksandrVlasiuk}"
            alt="Александр Власюк"
          />
        </div>
        <div class="students-modal-content">
          <h2>Александр Власюк<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${YuriiBerezynets}"
            alt="Юрий Березинец"
          />
        </div>
        <div class="students-modal-content">
          <h2>Юрий Березинец<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${KostyaPanasiuk}"
            alt="Константин Панасюк"
          />
        </div>
        <div class="students-modal-content">
          <h2>Константин Панасюк<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${ValentinaManankova}"
            alt="Валентина Мананкова"
          />
        </div>
        <div class="students-modal-content">
          <h2>Валентина Мананкова<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${IrinaMaliugova}"
            alt="Ирина Малюгова"
          />
        </div>
        <div class="students-modal-content">
          <h2>Ирина Малюгова<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${IrynaKosynienko}"
            alt="Ирина Косиненко"
          />
        </div>
        <div class="students-modal-content">
          <h2>Ирина Косиненко<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${TatianaUlrich}"
            alt="Татьяна Ульрих "
          />
        </div>
        <div class="students-modal-content">
          <h2>Татьяна Ульрих<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${YuliyaChyzhkova}"
            alt="Юлия Чижкова"
          />
        </div>
        <div class="students-modal-content">
          <h2>Юлия Чижкова<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img class="student-modal-avatar" src="${IgorVasylytsya}" alt="" />
        </div>
        <div class="students-modal-content">
          <h2>Игорь Васылыця<br /><span>Developer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${vjuh}"
            alt="Захар Скиба"
          />
        </div>
        <div class="students-modal-content">
          <h2>Гит Краш<br /><span>Destroyer</span></h2>
        </div>
      </div>
      <!-- ============================================= -->
      <div class="students-modal-card">
        <div class="students-modal-imgBx">
          <img
            class="student-modal-avatar"
            src="${SergeyVishnevskiy}"
            alt="Cергей Вишневський"
          />
        </div>
        <div class="students-modal-content">
          <h2>Cергей Вишневський<br /><span>Scrum Master</span></h2>
        </div>
      </div>
    </div>
    `;
  };
  const closeModal = () => {
    container.classList.remove('show-modal');
    container.addEventListener('click', close);
    document.removeEventListener('keydown', close);
    body.style.overflow = 'unset';
  };
  const close = e => {
    if (e.target === document.querySelector('.modal') || e.key === 'Escape') {
      closeModal();
    } else return;
  };
  container.innerHTML = createModalMarkup(closeModal);
  container.classList.add('show-modal', 'transition-effect');
  body.style.overflow = 'hidden';
  container.addEventListener('click', close);
  document.addEventListener('keydown', close);
  return closeModal;
};
