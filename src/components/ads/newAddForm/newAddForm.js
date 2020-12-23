import './newAddForm.css';
import validator from 'validator';
import axios from 'axios';
import newAddForm from '../newAddForm/templates/newAddForm.hbs';
import inputPlus from '../newAddForm/templates/inputPlus.hbs'
import inputGrey from '../newAddForm/templates/inputGrey.hbs'
import { modalBackDrop } from '../../modal/modalBackDrop';


const createModalMarkup = document.querySelector('.markup_btn')

createModalMarkup.innerHTML = newAddForm();

const formAdv = document.forms.newAdvForm;

// axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZmUzMWQyMmE0ZjYyYzAwMTdhZWE3ZTciLCJzaWQiOiI1ZmUzMWQ1NmE0ZjYyYzAwMTdhZWE3ZTgiLCJpYXQiOjE2MDg3MTk3MDIsImV4cCI6MTYwODcyMzMwMn0.cPevRVrq01opiCfgjVGiSBGi3k1Rx32-4uxndyECLzw';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const headers = {
  'Content-Type': 'multipart/form-data',
  Authorization:
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

const toDataURL = elem => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(elem.files[0])
    })
}

const addPlus = (event) => {
    if (event.target.type !== 'file') {
        return
    }
    const inputWrapper = document.querySelector('.input_wrapper');
    inputWrapper.insertAdjacentHTML('beforeend', inputPlus())
}

const createBox = () => {
    const inputWrapper = document.querySelector('.input_wrapper');
    
    // const createElemMarkup = () => {
    //     let markUp = '';
    //     for (let i = 0; i < 6; i += 1) {
    //         markUp += inputPlus()
    //     }
    //     return markUp;
    // }
    // inputWrapper.innerHTML = createElemMarkup();
    inputWrapper.innerHTML = inputPlus();
    const input = document.querySelector('.input_load_file')

    
    // if (newObjAdv.file.length < 6) {
    //     inputWrapper
    //         .insertAdjacentHTML('beforeend', inputPlus())
    //     const input = document.querySelector('.input_load_file')
    //     console.log(input);

    //     input.addEventListener('change', async (event) => {
    //         console.log('hello');

    //         toDataURL(event.target)
    //             .then(data => {
    //                 newObjAdv.file.push(data)
    //             }).then(createBox)
    //         // newObjAdv.file.push(event.target.value)
    //         console.log(newObjAdv);
    //     })
    // }
   
}
createBox()

const getFormData = (event) => {
    if (event.target.type === 'file') {
        return
    }
    const { name, value } = event.target;
    newObjAdv[name] = value;
}
formAdv.addEventListener('input', getFormData)
formAdv.addEventListener('change', addPlus)


const postNewAdv = async (event) => {
    event.preventDefault();
    console.log(newObjAdv);

    const formData = new FormData();
    formData.append('title', newObjAdv.title);
    formData.append('description', newObjAdv.description);
    formData.append('category', 'transport');
    formData.append('price', Number(newObjAdv.price));
    formData.append('phone', '+380933916239');

    const inputElements = document.querySelectorAll('.input_load_file')
    // const inputElements = document.querySelector('.input_load_file')
    console.log([...inputElements]);
    
    [...inputElements].forEach(element => {
        if (element.files) {
            formData.append('file', element.files[0]);
        }
    });

    // for (const elem of Array.from(inputElements)) {
    //     console.log(elem.value);
    // }

    const result = await axios.post(`https://callboard-backend.herokuapp.com/call`,
    formData, {
      headers: headers,
    },
  );
  console.log('result', result);
}
formAdv.addEventListener('submit', postNewAdv)








