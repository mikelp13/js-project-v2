import { data } from "../data/data";
import axios from 'axios';


export const getCategories = async () => {
 
  try {
    if (data.calls.categories.length) {
      // console.log('if result:', data.calls.categories);
      return data.calls.categories;
    } else {
      const result = await axios.get(
        'https://callboard-backend.herokuapp.com/call/categories',
      );
      data.calls.categories = [...result.data];
      result.data.forEach(
        item => (data.calls.specificCategory[item] = []),
      
      );
      // console.log('getCategories API:', [...result.data]);
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
      // console.log('getCategoriesSpesific API:', [...result.data]);
     
    return result.data;
  } catch (error) {}
};



