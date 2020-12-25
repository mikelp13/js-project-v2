import axios from 'axios';
import {data} from '../../data/data'
const baseUrl = 'https://callboard-backend.herokuapp.com';
const key = JSON.parse(localStorage.getItem('accessToken'))

export const getUserData = async () => {

  try
  {
    if (localStorage.getItem('accessToken')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;
      await axios.get("https://callboard-backend.herokuapp.com/user")
  .then(response=> data.user = {...response.data})
  console.log(data);
   }
  }
  catch(error){
    console.log(error);
  }
}

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


export const getFavourites = async () => {
  try {
    const result = await this.axios.get(`${baseUrl}/call/favourites`,  {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${key}`,
      }
    });
    return result.data.user }
  catch (error) {
    console.log(error);
  }

};

// getFavourites();


export const addFavourite = async (id, favorItem) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${key}`;

  try {
    //const favorItem = document.querySelector('.heart');

  if (localStorage.getItem('accessToken'))
  {
   if ( data.user.favourites.some(item => item._id === id))
    {
      await axios.delete(`${baseUrl}/call/favourite/${id}`)
      data.user.favourites=[...data.user.favourites.filter(item => item._id !== id)]
      favorItem.classList.toggle('activeicon')
    }
    else { await axios.post(`${baseUrl}/call/favourite/${id}`)
    .then(response => {
      data.user.favourites = [...response.data.newFavourites]
     // const favorItem = document.querySelector('.heart');
      favorItem.classList.toggle('activeicon')


    }
    )
    console.log(data.user.favourites);
  }
  }
  else
    {

      if (localStorage.getItem('favorites'))

      {
        const localFavorites = JSON.parse(localStorage.getItem('favorites'))
        if ( JSON.parse(localStorage.getItem('favorites')).some(item => item === id)) {

          localStorage.setItem('favorites', JSON.stringify(localFavorites.filter(item => item !== id)))
          favorItem.classList.toggle('activeicon')
        }
        else {localStorage.setItem('favorites', JSON.stringify([...localFavorites, id]))
        favorItem.classList.toggle('activeicon')}
      }
      else {
        localStorage.setItem('favorites', JSON.stringify([id]))
      }
    }

}catch (error) {
throw error;
}
};

// addFavourite();

export const delFavourite = id => {
  try {
    const result = axios.delete(`${baseUrl}/call/favourite/${id}`, {
     headers: {
       'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${key}`,
   }});
  }
  catch (error) {
    throw error;
  }
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

//===bra

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
