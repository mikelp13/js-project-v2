import { data } from "../data/data";
import axios from 'axios';


const createCamelCase = (value) => {
    return value;
};




export const getCategories = async () => {
 
  try {
    if (data.calls.categories.length) {
      console.log('if result:', data.calls.categories);
      return data.calls.categories;
    } else {
      const result = await axios.get(
        'https://callboard-backend.herokuapp.com/call/categories',
      );
      data.calls.categories = [...createCamelCase(result.data)];
      result.data.forEach(
        item => (data.calls.specificCategory[createCamelCase(item)] = []),
      
      );
      console.log('getCategories API:', [...result.data]);
      return result.data;
    }
  } catch (error) { }

};

export const getCategoriesSpesific = async categoryName => {
  try {
    const result = await axios.get(
      `https://callboard-backend.herokuapp.com/call/specific/${categoryName}`,
    );
      data.calls.specificCategory[categoryName] = [...result.data];
      console.log('getCategoriesSpesific API:', [...result.data]);
     
    return result.data;
  } catch (error) {}
};


// export const getCategories = async () => {
//     if (data.call.categories.length) {
//         console.log('if result:',data.call.categories);
//         return data.call.categories;
//     }   else {
//             const response = await fetch(
//                 'https://callboard-backend.herokuapp.com/call/categories'
//             ).then(data => data.json());

//             data.call.categories = [...response];
//             console.log('Category fetch result:',data.call.categories);
//             return response;
//         }
// };

// export const getCategoriesSpesific = async () => {

// };



