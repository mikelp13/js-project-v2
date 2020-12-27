import './styles.css';
import { data } from '../../data/data';
import { productInfoMarkup } from '../product-info/index';
import { createNewAdv } from '../ads/newAddForm/newAddForm';
import { modalBackDrop } from '../modal/modalBackDrop';
import newAddForm from '../ads/newAddForm/newAddForm.hbs';

// const getCall = (category, id) => {
//   const call = data.calls.specificCategory[category].find(
//     elem => elem._id === id,
//   );
//   // modalBackDrop(productInfoMarkup);
//   productInfoMarkup(call);
// };

const getCall = e => {
  // console.log('e :>> ', e[0]);
  // productInfoMarkup(call);
  const li = e[0].currentTarget;
  const { category, callid } = li.dataset;
  const call = data.calls.specificCategory[category].find(
    elem => elem._id === callid,
  );
console.log('e[0].target :>> ', e[0].target);
    if (e[0].target.dataset.editablebtn) {
      modalBackDrop(newAddForm());
      createNewAdv(call)
    } else {
      productInfoMarkup(call);
    }
 
  // console.log('category :>> ', category);
  // console.log('id :>> ', callid );
};

$(function () {
  $(document).on('click touchstart', '.category-card', function (e) {
    // getCall($(this).data('category'), $(this).data('callid'));
    getCall($(e));
  });
});
