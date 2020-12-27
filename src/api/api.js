import axios from 'axios';
import { data } from '../data/data';
const token = JSON.parse(localStorage.getItem('accessToken'));
axios.defaults.baseURL = 'https://callboard-backend.herokuapp.com';
axios.defaults.headers.common['Authorization'] = token;

export const getCategories = async () => {
  try {
    if (data.calls.categories.length) {
      return data.calls.categories;
    } else {
      const res = await axios.get(`/call/categories`);
      data.calls.categories = [...res.data];
      data.calls.originalCategories = [...res.data];
      res.data.forEach(item => (data.calls.specificCategory[item] = []));
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesSpecific = async categoryName => {
  try {
    if (data.calls.specificCategory[categoryName].length) {
      return data.calls.specificCategory[categoryName];
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

export const postAdv = () => {
  return axios.post(`/call`);
};

export const patchAdv = id => {
  return axios.patch(`/call/${id}`);
};

export const delAdv = id => {
  return axios.delete(`/call/${id}`);
};

export const getUserAdv = async () => {
  try {
    if (data.user.adv.length) {
      return data.user.adv;
    } else {
      const res = await axios.get(`/call/own`);
      data.user.adv = [...res.data.favourites];
      return res.data.favourites;

    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async () => {
  try {
    if (localStorage.getItem('accessToken')) {
      const res = await axios.get('/user');
      data.user = { ...res.data };
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAds = async () => {
  try {
    if (data.calls.ads.length) {
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

export const favouriteApi = async (id, favorItem, favorName) => {
  try {
    if (localStorage.getItem('accessToken')) {
      if (data.user.favourites.some(item => item._id === id)) {
        await axios.delete(`/call/favourite/${id}`);
        data.user.favourites = [
          ...data.user.favourites.filter(item => item._id !== id),
        ];
        favorItem.classList.toggle('activeicon');
        favorName.classList.toggle('activename');
      } else {
        const res = await axios.post(`/call/favourite/${id}`);
        data.user.favourites = [...res.data.newFavourites];
        favorItem.classList.toggle('activeicon');
        favorName.classList.toggle('activename');
      }
    } else {
      if (localStorage.getItem('favorites')) {
        const localFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (
          JSON.parse(localStorage.getItem('favorites')).some(
            item => item === id,
          )
        ) {
          localStorage.setItem(
            'favorites',
            JSON.stringify(localFavorites.filter(item => item !== id)),
          );
          favorItem.classList.toggle('activeicon');
        } else {
          localStorage.setItem(
            'favorites',
            JSON.stringify([...localFavorites, id]),
          );
          favorItem.classList.toggle('activeicon');
        }
      } else {
        localStorage.setItem('favorites', JSON.stringify([id]));
      }
    }
  } catch (error) {
    throw error;
  }
};
