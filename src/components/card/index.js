import './styles.css';
import { data } from '../../data/data';



const getCall = (category, id) => {
    const call = data.calls.specificCategory[category].find((elem) => elem._id === id);
    modalBackDrop();
 };

$(function () {
        $(document).on('click touchstart', '.category-card', function(){ 
            getCall($(this).data('category'), $(this).data('callid'));
            console.log('card click', $(this).data('category'));
            console.log('card click', $(this).data('callid'));
        });
    });


