import axios from 'axios';
import {data} from '../../data/data'
const baseUrl = 'https://callboard-backend.herokuapp.com';

//=== Call endpoints ===//

/*
 Публикация, редактирование и удаление обьявления, получает такой обьект
*/

// const newAds = {
//     title: "string",
//     description: "string",
//     category: "string",
//     price: "integer",
//     phone: "string",
//     file: "string($binary)",
// };

// export const postAds = (newAds) => {
//   return axios.post(`${baseUrl}/call`, newAds);
// };

export const postAds = advertData => {
  const { title, description, category, price, phone, file } = advertData;
  return axios.post(`${baseUrl}/call`, {
    title,
    description,
    category,
    price,
    phone,
    file,
  });
};

// postAds();

export const patchAds = (advertData, id) => {
  const { title, description, category, price, phone, file } = advertData;
  return axios.patch(`${baseUrl}/call/${id}`, {
    title,
    description,
    category,
    price,
    phone,
    file,
  });
};

// patchAds();

export const delAds = id => {
  return axios.delete(`${baseUrl}/call/${id}`);
};

// delAds();

//===

/*
 Получение страниц с категориями по номеру страницы(1-3) параметр page получает такие объекты
*/

// {
//   "sales": [
//     {
//       "title": "Tesla Model X",
//       "imageUrls": [
//         "string"
//       ],
//       "description": "New tesla",
//       "category": "transport",
//       "price": 1500000,
//       "oldPrice": 1750000,
//       "isOnSale": true,
//       "discountPercents": 14.28571428571429,
//       "phone": "+380000000000",
//       "userId": "507f1f77bcf86cd799439011",
//       "_id": "507f1f77bcf86cd799439013",
//       "__v": 0
//     }
//   ],
//   "recreationAndSport": [
//     {
//       "title": "Tesla Model X",
//       "imageUrls": [
//         "string"
//       ],
//       "description": "New tesla",
//       "category": "transport",
//       "price": 1500000,
//       "isOnSale": false,
//       "phone": "+380000000000",
//       "userId": "507f1f77bcf86cd799439011",
//       "_id": "507f1f77bcf86cd799439014",
//       "__v": 0
//     }
//   ],

export const getPagesCategories = (page = 1) => {
  return axios.get(`${baseUrl}/call?page=${page}`);
};

// getPagesCategories();

//====

/*
 Запрос, а так же добавляет и  удаляет избранное (id параметр в обьекте call)
*/

export const getFavourites = () => {
  return axios.get(`${baseUrl}/call/favourites`);
};

// getFavourites();
const key = localStorage.getItem('accessToken');

export const addFavourite = async (id) => {
  if (data.user.favorites.length === 0){
    let result = await axios.post(`${baseUrl}/call/favourite/${id}`, {
     headers: {
       'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${key}`,
   }})
  return result;
  }
    else {
      return data.user.favorites
    }
};

// addFavourite();

export const delFavourite = id => {
  return axios.delete(`${baseUrl}/call/favourite/${id}`);
};

// delFavourite();

//===

/*
 Получает список объявлений юзера
*/

export const getUserCalls = () => {
  return axios.get(`${baseUrl}/call/own}`);
};

// getUserCalls();

//===

/*
 Получение страниц с категориями по запросу(значения поля поиск)
*/

export const getSearchQuery = searchQuery => {
  return axios.get(`${baseUrl}/call/find?search=${searchQuery}`);
};

// getSearchQuery();

//===

/*
 Получает список всех категорий товаров
*/

// [
//   "property",
//   "transport",
//   "work",
//   "electronics",
//   "business and services",
//   "recreation and sport",
//   "free",
//   "trade",
// ];

export const getCategories = () => {
  return axios.get(`${baseUrl}/call/categories`);
};

// getCategories();

//===

/*
 Получает одну категорию со списка категорий
*/

export const getOneCategory = cat => {
  return axios.get(`${baseUrl}/call/specific/${cat}`);
};

// getOneCategory("work");

//===

/*
 Получает список рекламных карточек
*/

// [
//   {
//     title: "Compact Stereo Speakers",
//     price: 850,
//     imageUrl:
//       "https://storage.googleapis.com/kidslikev2_bucket/z120-stereo-speakers.png",
//   },
//   {
//     title: "Flying Drone 42K black",
//     price: 4000,
//     imageUrl:
//       "https://storage.googleapis.com/kidslikev2_bucket/5cb84c5f7ff3656569c8cec5.png",
//   },
// ];

export const getAds = () => {
  return axios.get(`${baseUrl}/call/ads`);
};

getAds();

//===
