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
    if (e[0].target.dataset.editablebtn) {
      modalBackDrop(newAddForm());
      const call = data.user.adv.find(
        elem => elem._id === callid,
      );
      createNewAdv(call)
    } else {
      productInfoMarkup(call);
    }
};

$(function () {
  $(document).on('click touchstart', '.category-card', function (e) {
    getCall($(e));
  });
});
