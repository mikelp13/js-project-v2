import './styles.css';
import { data } from '../../data/data';
import { productInfoMarkup } from '../product-info/index';

const getCall = (category, id) => {
  const call = data.calls.specificCategory[category].find(
    elem => elem._id === id,
  );
  // modalBackDrop(productInfoMarkup);
  productInfoMarkup(call);
};

$(function () {
  $(document).on('click touchstart', '.category-card', function () {
    getCall($(this).data('category'), $(this).data('callid'));
  });
});
