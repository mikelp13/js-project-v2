import { data } from '../data/data';
import axios from 'axios';
import { camelCase } from 'lodash';
const token = JSON.parse(localStorage.getItem('accessToken'));
axios.defaults.baseURL = 'https://callboard-backend.herokuapp.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const getCategories = async () => {
  try {
    if (data.calls.categories.length) {
      return data.calls.categories;
    } else {
      const res = await axios.get(`/call/categories`);
      data.calls.categories = [...res.data.map(item => camelCase(item))];
      res.data.forEach(item => (data.calls.specificCategory[item] = []));
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesSpecific = async categoryName => {
  try {
    if (data.calls.specificCategory.length) {
      return data.calls.specificCategory;
    } else {
      const res = await axios.get(`/call/specific/${categoryName}`);
      data.calls.specificCategory[categoryName] = [...res.data];
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getRussianCategories = async () => {
  try {
    if (data.calls.russianCategories.length) {
      return data.calls.russianCategories;
    } else {
      const result = await axios.get('/call/russian-categories');
      data.calls.russianCategories = [...result.data.map(item => item)];
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async page => {
  try {
    if (data.calls.allCategories.length) {
      return data.calls.allCategories;
    } else {
      const res = await axios.get(`/call?page=${page}`);
      data.calls.allCategories = [...res.data];
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//===
// const newObjAdv = {
//   title: '',
//   description: '',
//   category: 'transport',
//   price: '',
//   phone: '',
//   file: [],
// };

export const postAdv = () => {
  return axios.post(`/call`, newObjAdv);
};

//===

// const pathObjAdv = {
//   title: '',
//   description: '',
//   category: 'transport',
//   price: '',
//   phone: '',
//   file: [],
// };

export const patchAdv = id => {
  return axios.patch(`/call/${id}`, patchObjAdv);
};
//===

export const delAds = id => {
  return axios.delete(`/call/${id}`);
};

//===

export const getUserAdv = async () => {
  try {
    if (data.user.adv.length) {
      return data.user.adv;
    } else {
      const res = await axios.get(`/call/own`);
      data.user.adv = [...res.data];
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//===

export const addInFavourites = async (id, card) => {
  try {
    if (data.user.favourites.length) {
      return data.user.favourites;
    } else {
      const res = await axios.post(`/call/favourite/${id}`, card);
      data.user.favourites = [...res.data.user.newFavourites];
      return res.data.newFavourites;
    }
  } catch (error) {
    console.log(error);
  }
};

//===

export const delInFavourites = async id => {
  try {
    if (data.user.favourites.length) {
      return data.user.favourites;
    } else {
      const res = await axios.delete(`/call/favourite/${id}`);
      data.user.favourites = [...res.data.newFavourites];
      return res.data.newFavourites;
    }
  } catch (error) {
    console.log(error);
  }
};

//===

export const getFavourites = async () => {
  try {
    if (data.user.favourites.length) {
      return data.user.favourites;
    } else {
      const res = await axios.get(`/call/favourites`);
      data.user.favourites = [...res.data.favourites];
      return res.data.favourites;
    }
  } catch (error) {
    console.log(error);
  }
};

//===

export const getAds = async () => {
  try {
    if (data.calls.ads.length) {
      // console.log('load ads:', data.calls.ads);
      return data.calls.ads;
    } else {
      const res = await axios.get(`/call/ads`);
      data.calls.ads = [...res.data];
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

//===
