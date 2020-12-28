import './newAddForm.css';
import axios from 'axios';
import { data } from '../../../data/data';
import { modalBackDrop } from '../../modal/modalBackDrop';
import newAddForm from './newAddForm.hbs';
import { newAdv } from '../../header/js/newAdv';
import { openByCategory } from '../../catalog/categories-list';
import { getUserAdv } from '../../../api/api';


export const createNewAdv = adv => {
  console.log('adv :>> ', adv);
  const container = document.querySelector('.modal');

  const btnClose = document.querySelector('.modal-close-btn');
  const btnAdd = document.querySelector('.btn_push');


  const onXclose = () => {
    container.classList.remove('is-open');
    btnClose.removeEventListener('click', onXclose);
  };
  btnClose.addEventListener('click', onXclose);
  btnAdd.addEventListener('click', onXclose);

  const inputWrapper = document.querySelector('.input_wrapper');
  const formAdv = document.forms.newAdvForm;

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: JSON.parse(localStorage.getItem('accessToken')),
  };
  console.log(data);

  const baseURL = 'https://callboard-backend.herokuapp.com/call';

  let newObjAdv = {
    title: '',
    description: '',
    category: data.calls.originalCategories[0],
    price: '',
    phone: '',
    file: [],
  };
  const formData = new FormData();
  newObjAdv = { ...newObjAdv, ...adv };
  const createOptionsMarkup = () => {
    return data.calls.originalCategories.reduce((acc, item, index) => {
      acc += `<option value="${item}">${data.calls.russianCategories[index]}</option>`;
      return acc;
    }, '');
  };

  const createSelectMarkup = () => {
    return `<select name="category" class="form_input">${createOptionsMarkup()}</select>`;
  };
  const select = document.querySelector('.form_field--select');
  select.innerHTML = createSelectMarkup();

  const toDataURL = elem => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(elem.files[0]);
    });
  };

  const createMarkupPlus = () => {
    return `<li class="file_load" data-id="${newObjAdv.file.length}">
                    <label for="file_load${newObjAdv.file.length}" class="label_load">
                        <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                        <span class="file_load-plus_load">+</span>
                    </label>
                </li>`;
  };

  const createGreyMarkup = () => {
    const markup = `<div class="file_load js-block">
                        <div class="label_load"></div>
                    </div>`;
    let resultMarkup = '';
    for (let i = newObjAdv.file.length; i < 4; i += 1) {
      resultMarkup += markup;
    }
    return resultMarkup;
  };

  const addPlus = async event => {
    if (event.target.type === 'file') {
      const id = event.target.closest('[data-id]').dataset.id;

      if (Number(id) !== newObjAdv.file.length) {
        event.target
          .closest(`[data-id]`)
          .querySelector('img').src = await toDataURL(event.target);
        return;
      }

      await toDataURL(event.target).then(img => {
        const li = document.querySelector(`[data-id="${id}"]`);
        const label = li.querySelector('label');
        console.log(event.target);
        const image = document.createElement('img');
        image.src = img;
        image.alt = `picture${id}`;
        image.classList.add('img-adv-box');
        label.append(image);
        const span = label.querySelector('.file_load-plus_load');
        span.classList.add('invisible');
        newObjAdv.file.push(img);
      });

      if (newObjAdv.file.length < 5) {
        const block = document.querySelector('.js-block');
        const newPlus = document.createElement('li');
        newPlus.classList.add('file_load');
        newPlus.dataset.id = `${newObjAdv.file.length}`;
        newPlus.innerHTML = `
                    <label for="file_load${newObjAdv.file.length}" class="label_load">
                    <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                    <span class="file_load-plus_load">+</span>
                    </label>
                    `;
        block.replaceWith(newPlus);
      }
    } else {
      const { name, value } = event.target;
      newObjAdv[name] = value;
    }
  };

  const createBox = () => {
    inputWrapper.innerHTML = createMarkupPlus();
    inputWrapper.insertAdjacentHTML('beforeend', createGreyMarkup());
  };

  const getFormData = event => {
    const { name, value, type } = event.target;
    if (type === 'file') return;
    newObjAdv[name] = value;
  };
  const getPrice = () => {
    if (
      newObjAdv.category === 'free' ||
      newObjAdv.category === 'work' ||
      newObjAdv.category === 'trade'
    ) {
      return 0;
    } else return Number(newObjAdv.price);
  };

  const postNewAdv = async event => {
    event.preventDefault();

    formData.append('title', newObjAdv.title);
    formData.append('description', newObjAdv.description);
    formData.append('category', newObjAdv.category);
    formData.append('price', getPrice());
    formData.append('phone', newObjAdv.phone);

    if (!adv) {
      const allInputsFiles = document.querySelectorAll('.input_load_file');

      for (let i = 0; i < allInputsFiles.length; i += 1) {
        if (allInputsFiles[i].files.length) {
          formData.append(
            'file',
            allInputsFiles[i].files[0],
            `picture${i}.jpg`,
          );
        }
      }
      const result = await axios.post(baseURL, formData, { headers });
      data.calls.specificCategory[newObjAdv.category] = [
        ...data.calls.specificCategory[newObjAdv.category],
        {...result.data, _id:result.data.id},
      ];
      data.user.adv = [...data.user.adv, {...result.data, _id:result.data.id}];
      console.log('result :>> ', result);
      console.log('data.user.adv :>> ', data.user.adv);
      openByCategory(await getUserAdv(), true);
    } else {
      const allInputsFiles = document.querySelectorAll('.input_load_file');

      for (let i = 0; i < allInputsFiles.length; i += 1) {
        if (allInputsFiles[i].files.length) {
          formData.append(
            'file',
            allInputsFiles[i].files[0],
            `picture${i}.jpg`,
          );
        }
      }
      const result = await axios.patch(`${baseURL}/${adv._id}`, formData, {
        headers,
      });
      console.log('resffffffult :>> ', result.data);
      data.calls.specificCategory[newObjAdv.category] = [
        ...data.calls.specificCategory[newObjAdv.category].map(item =>
          item._id === newObjAdv._id ? { ...result.data } : item,
        ),
      ];
      data.user.adv = [
        ...data.user.adv.map(item =>
          item._id === newObjAdv._id ? { ...item, ...result.data } : item,
        ),
      ];
      console.log('data.user.adv :>> ', data.user.adv);
      openByCategory(await getUserAdv(), true);
    }
  };

  //============================ editAddForm =======================

  const editAddForm = () => {
    const editTitle = document.querySelector('.form_text');
    const divDelete = document.querySelector('.form_delete');
    const btnText = document.querySelector('.btn_text');
    editTitle.textContent = 'Редактировать объявление';
    btnText.textContent = 'Редактировать';

    divDelete.innerHTML = `<button class="btn_deleteAdv" data-btn="delite-btn">
                            <span class="btnDelete_text">Удалить объявление</span>
                          </button>`;
    divDelete.addEventListener('click', onXclose);
    newObjAdv = { ...newObjAdv, ...adv };
    formAdv.title.value = newObjAdv.title;
    formAdv.description.value = newObjAdv.description;
    formAdv.category.value = newObjAdv.category;
    formAdv.price.value = newObjAdv.price;
    formAdv.phone.value = newObjAdv.phone;

    const createFotoMarkup = () => {
      return newObjAdv.imageUrls.reduce((acc, item) => {
        acc += `
                    <li class="file_load" data-id="${newObjAdv.file.length}">
                        <label for="file_load${newObjAdv.file.length}" class="label_load">
                            <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                            <img src="${item}" alt="picture" class="img-adv-box"/>
                        </label>
                    </li>
                `;
        newObjAdv.file.push(item);
        return acc;
      }, '');
    };
    inputWrapper.innerHTML = createFotoMarkup();

    if (newObjAdv.file.length < 5) {
      inputWrapper.insertAdjacentHTML(
        'beforeend',
        `
                <li class="file_load" data-id="${newObjAdv.file.length}">
                        <label for="file_load${newObjAdv.file.length}" class="label_load">
                        <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                        <span class="file_load-plus_load">+</span>
                        </label>
                </li>
                    `,
      );
    }
    inputWrapper.insertAdjacentHTML('beforeend', createGreyMarkup());
    const deleteAdv = async event => {
      if (event.target.closest('[data-btn="delite-btn"]')) {
        await axios.delete(`${baseURL}/${adv._id}`);
        data.calls.specificCategory[newObjAdv.category] = [
          ...data.calls.specificCategory[newObjAdv.category].filter(
            item => item._id !== newObjAdv._id,
          ),
        ];

        data.user.adv = [
          ...data.user.adv.filter(item => item._id !== newObjAdv._id),
        ];
        openByCategory(await getUserAdv(), true);
      }
    };

    formAdv.addEventListener('click', deleteAdv);
  };

  //================================================================
  adv ? editAddForm() : createBox();

  formAdv.addEventListener('input', getFormData);
  formAdv.addEventListener('change', addPlus);
  formAdv.addEventListener('submit', postNewAdv);
};
