import axios from 'axios';
import { data } from '../../data/data';
// const token = localStorage.getItem('accessToken');
// axios.defaults.baseURL = 'https://callboard-backend.herokuapp.com';
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//=== Call endpoints ===//

/*
 Публикация, редактирование и удаление обьявления, получает такой обьект
*/

// const newAds = {
//   title: "string",
//   description: "string",
//   category: "string",
//   price: "integer",
//   phone: "string",
//   file: "string($binary)",
// };

export const postAds = newAds => {
  return axios.post(`/call`, newAds);
};

// export const postAds = (advertData) => {
//   const { title, description, category, price, phone, file } = advertData;
//   return axios.post(`/call`, {
//     title,
//     description,
//     category,
//     price,
//     phone,
//     file,
//   });
// };

// postAds();

export const patchAds = (advertData, id) => {
  const { title, description, category, price, phone, file } = advertData;
  return axios.patch(`/call/${id}`, {
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
  return axios.delete(`/call/${id}`);
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
  return axios.get(`/call?page=${page}`);
};

// getPagesCategories();

//====

/*
 Запрос, а так же добавляет и  удаляет избранное (id параметр в обьекте call)
*/

export const getFavourites = () => {
  return axios.get(`/call/favourites`);
};

// getFavourites();

export const addFavourite = async id => {
  if (loggedUser.logInUser.favorites.length) {
    return loggedUser.logInUser.favorites;
  } else {
    const responce = await axios.post(`/call/favourite/${id}`);
    loggedUser.logInUser.favorites = [...responce];

    return responce;
  }
};

// addFavourite();

export const delFavourite = id => {
  return axios.delete(`/call/favourite/${id}`);
};

// delFavourite();

//===

/*
 Получает список объявлений юзера
*/

export const getUserCalls = () => {
  return axios.get(`/call/own}`);
};

// getUserCalls();

//===

/*
 Получение страниц с категориями по запросу(значения поля поиск)
*/

export const getSearchQuery = searchQuery => {
  return axios.get(`/call/find?search=${searchQuery}`);
};

// getSearchQuery('Work');

//===

/*
 Получает список всех категорий товаров
*/

// [
//   'Недвижимость',
//   'Транспорт',
//   'Работа',
//   'Электроника',
//   'Бизнес и услуги',
//   'Отдых и спорт',
//   'Отдам бесплатно',
//   'Обмен',
// ];

// export const getCategories = async () => {
//   if (data.call.allCategories.length) {
//     return data.call.allCategories;
//   } else {
//     const res = await axios.get(`/call/categories`);
//     data.call.allCategories = [...res];

//     return res;
//   }
// };
// console.log(data.call.allCategories);

// // getCategories();

const getCategories = async () => {
  try {
    const result = await axios.get(
      'https://callboard-backend.herokuapp.com/call/categories',
    );
    console.log(result);
    data.calls.categories = [...result.data];
    // console.log(data.calls.categories);
    result.data.forEach(item => (data.calls.categoriesList[item] = []));
    // console.log(data.calls.categoriesList);
    // console.log(data.calls);
  } catch (error) {
    console.log(error);
  }
};

// getCategories();
//===

/*
 Получает одну категорию со списка категорий
*/

export const getOneCategory = cat => {
  return axios.get(`/call/specific/${cat}`);
};

// getOneCategory();

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

// export const getAds = () => {
//   return axios.get(`/call/ads`);
// };

// getAds();

// export const getAds = async () => {
//   try {
//     if (data.calls.ads.length) {
//       console.log('load ads:', data.calls.ads);
//       return data.calls.ads;
//     } else {
//       const res = await axios.get(`/call/ads`);
//       data.calls.ads = [...res.data];
//       console.log('get ads:', data.calls.ads);
//       return res.data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAds();
// getAds();

// export const getCategories = async () => {
//   try {
//     if (data.calls.categories.length) {
//       console.log('if result:', data.calls.categories);
//       return data.calls.categories;
//     } else {
//       const result = await axios.get(
//         'https://callboard-backend.herokuapp.com/call/categories',
//       );
//       data.calls.categories = [...createCamelCase(result.data)];
//       result.data.forEach(
//         item => (data.calls.specificCategory[createCamelCase(item)] = []),
//       );
//       console.log('getCategories API:', [...result.data]);
//       return result.data;
//     }
//   } catch (error) {}
// };

//===
