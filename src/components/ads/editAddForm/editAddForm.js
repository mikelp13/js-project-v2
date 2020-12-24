import './newAddForm.css';
import validator from 'validator';
import axios from 'axios';
import newAddForm from '../newAddForm/templates/newAddForm.hbs';


const createModalMarkup = document.querySelector('.markup_btn')
createModalMarkup.innerHTML = newAddForm();
const inputWrapper = document.querySelector('.input_wrapper');
const grays = document.querySelector('.grey-wrapper');
const formAdv = document.forms.newAdvForm;

const headers = {
  'Content-Type': 'multipart/form-data',
    Authorization:
        // 'Bearer ' + getToken()
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUzMWQyMmE0ZjYyYzAwMTdhZWE3ZTciLCJzaWQiOiI1ZmUzNDhkOWE0ZjYyYzAwMTdhZWE4NGQiLCJpYXQiOjE2MDg3MzA4NDEsImV4cCI6MTYwODczNDQ0MX0.NY0pf3M1uGCrraa35Fsog4AEUdJ8hMtEyLHc-Wh3i0E',
};

const baseURL = 'https://callboard-backend.herokuapp.com/call';

const newObjAdv = {
    title: '',
    description: '',
    category: 'transport',
    price: '',
    phone: '',
    file: [],
}
const formData = new FormData();

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
  const markup = `<div class="file_load">
                    <div class="label_load"></div>
                </div>`;
  let resultMarkup = '';
  for (let i = newObjAdv.file.length; i < 4; i += 1) {
    resultMarkup += markup;
  }
  return resultMarkup;
};

const addPlus = async event => {
    if (event.target.type !== 'file') {
        return
    }
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
        inputWrapper.insertAdjacentHTML('beforeend', createMarkupPlus())
        grays.innerHTML = createGreyMarkup();
        createSecondBlock();
    }
}

const createSecondBlock = () => {
    let greyWrapp = '';
    const greyList = document.querySelector('.grey-wrapper');
    for (let i = newObjAdv.file.length; i < 4; i+=1) {
        greyWrapp += createGreyMarkup();
    }
    greyList.innerHTML = greyWrapp;
}

const createBox = () => {
    inputWrapper.innerHTML = createMarkupPlus();
    const input = document.querySelector('.input_load_file');
    grays.innerHTML = createGreyMarkup();
    createSecondBlock()
    // const createElemMarkup = () => {
    //     let markUp = '';
    //     for (let i = 0; i < 6; i += 1) {
    //         markUp += createMarkupPlus()
    //     }
    //     return markUp;
    // }
    // inputWrapper.innerHTML = createElemMarkup();
    
}

const getFormData = event => {
    const { name, value, type } = event.target;
    if (type === 'file') return;
    newObjAdv[name] = value;
}

const postNewAdv = async event => {
    event.preventDefault();

    formData.append('title', newObjAdv.title);
    formData.append('description', newObjAdv.description);
    formData.append('category', newObjAdv.category);
    formData.append('price', getPrice());
    formData.append('phone', newObjAdv.phone);
    
    const allInputsFiles = document.querySelectorAll('.input_load_file');
    
    for (let i = 0; i < allInputsFiles.length; i += 1){
        if (allInputsFiles[i].files.length) {
            formData
                .append('file', allInputsFiles[i].files[0], `picture${i}.jpg`);
        }
    }
    const result = await axios.post(baseURL, formData, headers);
    createBox();
}
    

const getPrice = () => {
    if (newObjAdv.category === "free"
        || newObjAdv.category === "work"
        || newObjAdv.category === "trade") {
            return 0
        } else return Number(newObjAdv.price)
}
createBox();
formAdv.addEventListener('input', getFormData)
formAdv.addEventListener('change', addPlus)
formAdv.addEventListener('submit', postNewAdv)





