import { data } from '../data/data';
import axios from 'axios';
const token = localStorage.getItem('accessToken');
axios.defaults.baseURL = 'https://callboard-backend.herokuapp.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
      result.data.forEach(item => (data.calls.specificCategory[item] = []));
      // console.log('getCategories API:', [...result.data]);
      return result.data;
    }
  } catch (error) {}
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

export const getAds = async () => {
  try {
    if (data.calls.ads.length) {
      console.log('load ads:', data.calls.ads);
      return data.calls.ads;
    } else {
      const res = await axios.get(`/call/ads`);
      data.calls.ads = [...res.data];
      console.log('get ads:', data.calls.ads);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
