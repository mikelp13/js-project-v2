import './newAddForm.css';
import validator from 'validator';
import axios from 'axios';
import { data } from '../../../data/data';
import newAddForm from './newAddForm.hbs';
import { modalBackDrop } from '../../modal/modalBackDrop'

export const createNewAdv = (adv) => {
    modalBackDrop(newAddForm());
    const container = document.querySelector('.modal');
    const btnXcls = document.querySelector('.modal-close-btn');
    const onXclose = () => {
        container.classList.remove('is-open');
    };

    btnXcls.addEventListener('click', onXclose);
    const inputWrapper = document.querySelector('.input_wrapper');
    const formAdv = document.forms.newAdvForm;

    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization:
        // 'Bearer ' + JSON.parse(localStorage.getItem('accessToken'))
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUzMWQyMmE0ZjYyYzAwMTdhZWE3ZTciLCJzaWQiOiI1ZmU2MTZjMmRmZWQ1ZjAwMTdlZWY1NWUiLCJpYXQiOjE2MDg5MTQ2MjYsImV4cCI6MTYwODkxODIyNn0.fIedSUgbKU5mi7W7H3d117f_iPm-HHr5HG9C-o6CpzA',
    };

    const baseURL = 'https://callboard-backend.herokuapp.com/call';

    let newObjAdv = {
        title: '',
        description: '',
        category: data.calls.originalCategories[0],
        price: '',
        phone: '',
        file: [],
    }
    const formData = new FormData();
    console.log(data);

    const createOptionsMarkup = () => {
        return data.calls.originalCategories.reduce((acc, item, index) => {
            acc += `<option value="${item}">${data.calls.russianCategories[index]}</option>`
            return acc;
        }, '')
    }

    const createSelectMarkup = () => {
        return `<select name="category" class="form_input">${createOptionsMarkup()}</select>`
    }
    const select = document.querySelector('.form_field--select');
    select.innerHTML = createSelectMarkup();

    const toDataURL = elem => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(elem.files[0])
        })
    }

    const createMarkupPlus = () => {
        return `<li class="file_load" data-id="${newObjAdv.file.length}">
                    <label for="file_load${newObjAdv.file.length}" class="label_load">
                        <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                        <span class="file_load-plus_load">+</span>
                    </label>
                </li>`
    }

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
                    .querySelector('img')
                    .src = await toDataURL(event.target);
                return;
            }

            await toDataURL(event.target).then(img => {
                const li = document
                    .querySelector(`[data-id="${id}"]`);
                const label = li.querySelector('label');
                console.log(event.target);
                const image = document.createElement('img')
                image.src = img;
                image.alt = `picture${id}`;
                image.classList.add('img-adv-box');
                label.append(image);
                const span = label.querySelector('.file_load-plus_load')
                span.classList.add('invisible');
                newObjAdv.file.push(img)
            })

            if (newObjAdv.file.length < 5) {
                const block = document.querySelector('.js-block');
                block.setAttribute('data-id', `${newObjAdv.file.length}`);

                const newPlus = document.createElement('li');
                newPlus.classList.add('file_load');
                newPlus.dataset.id = `${newObjAdv.file.length}`;
                newPlus.innerHTML = `
                    <label for="file_load${newObjAdv.file.length}" class="label_load">
                    <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                    <span class="file_load-plus_load">+</span>
                    </label>
                    `;
                block.replaceWith(newPlus)
            }
        } else {
            const { name, value } = event.target;
            newObjAdv[name] = value;
        }
    }

    const createBox = () => {
        inputWrapper.innerHTML = createMarkupPlus();
        inputWrapper.insertAdjacentHTML('beforeend', createGreyMarkup())
    }

    const getFormData = event => {
        const { name, value, type } = event.target;
        if (type === 'file') return;
        newObjAdv[name] = value;
    }
    const getPrice = () => {
        if (newObjAdv.category === "free" ||
            newObjAdv.category === "work" ||
            newObjAdv.category === "trade") {
            return 0
        } else return Number(newObjAdv.price)
    }

    const postNewAdv = async event => {
        event.preventDefault();

        formData.append('title', newObjAdv.title);
        formData.append('description', newObjAdv.description);
        formData.append('category', newObjAdv.category);
        formData.append('price', getPrice());
        formData.append('phone', newObjAdv.phone);

        const allInputsFiles = document.querySelectorAll('.input_load_file');

        for (let i = 0; i < allInputsFiles.length; i += 1) {
            if (allInputsFiles[i].files.length) {
                formData
                    .append('file', allInputsFiles[i].files[0], `picture${i}.jpg`);
            }
        }
        const result = await axios.post(baseURL, formData, { headers });
        data.calls.specificCategory[newObjAdv.category] = [...data.calls.specificCategory[newObjAdv.category], result.data]
    }

    //============================ editAddForm =======================

    const editAddForm = () => {
        const editTitle = document.querySelector('.form_text');
        const divDelete = document.querySelector('.form_delete');
        editTitle.textContent = 'Редактировать объявление';

        divDelete.innerHTML = `
        <button class="btn_deleteAdv">Удалить объявление</button>
        <p class="delete_text">Удалить объявление</p>
        `
        newObjAdv = {...newObjAdv, ...adv }
        formAdv.title.value = newObjAdv.title
        formAdv.description.value = newObjAdv.description
        formAdv.category.value = newObjAdv.category
        formAdv.price.value = newObjAdv.price
        formAdv.phone.value = newObjAdv.phone

        const createFotoMarkup = () => {
            return newObjAdv.imageUrls.reduce((acc, item) => {
                acc += `
                    <li class="file_load" data-id="${newObjAdv.file.length}">
                        <label for="file_load${newObjAdv.file.length}" class="label_load">
                            <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                            <img src="${item}" alt="picture" class="img-adv-box"/>
                        </label>
                    </li>
                `
                newObjAdv.file.push(item)
                    // formData.append('file', item, `picture${newObjAdv.file.length}.jpg`)
                return acc;
            }, '')
        }
        inputWrapper.innerHTML = createFotoMarkup();
        const allInputsFiles = document.querySelectorAll('.input_load_file');

        allInputsFiles.forEach((item, index) => {

            // item.files[0] = new File(toDataURL(item), `picture${index}.jpg`)
            const file = new File(item, `picture${index}.jpg`)
            console.log(file);
        })

        if (newObjAdv.file.length < 5) {
            inputWrapper.insertAdjacentHTML('beforeend', `
                <li class="file_load" data-id="${newObjAdv.file.length}">
                        <label for="file_load${newObjAdv.file.length}" class="label_load">
                        <input id="file_load${newObjAdv.file.length}" type="file" class="input_load_file">
                        <span class="file_load-plus_load">+</span>
                        </label>
                </li>
                    `)
        }
        inputWrapper.insertAdjacentHTML('beforeend', createGreyMarkup())
    }



    //================================================================
    adv ? editAddForm() : createBox();

    formAdv.addEventListener('input', getFormData);
    formAdv.addEventListener('change', addPlus);
    formAdv.addEventListener('submit', postNewAdv);

}