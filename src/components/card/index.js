import './styles.css';
import { data } from '../../data/data';
import { productInfoMarkup } from '../product-info/index';
import { createNewAdv } from '../ads/newAddForm/newAddForm';
import { modalBackDrop } from '../modal/modalBackDrop';
import newAddForm from '../ads/newAddForm/newAddForm.hbs';

const getCall = e => {
  const li = e[0].currentTarget;
  const { category, callid } = li.dataset;
  const call = data.calls.specificCategory[category].find(
    elem => elem._id === callid,
  );
  if (e[0].target.closest('[data-editablebtn]')) {
    modalBackDrop(newAddForm());
    // data.user.adv = [
    //   ...data.user.adv.map(item =>
    //     item.id ? { ...item, _id: item.id } : item,
    //   ),
    // ];
    const call = data.user.adv.find(elem => elem._id === callid);
    console.log('call :>> ', call);
    createNewAdv(call);
  } else {
    productInfoMarkup(call);
  }
};

$(function () {
  $(document).on('click touchstart', '.category-card', function (e) {
    getCall($(e));
  });
});
