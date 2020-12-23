import './styles.css';


$(function () {
        $(document).on('click touchstart', '.category-card', function(){ 
            modalOpen();
            console.log('card click', $(this));
        });
    });

function modalOpen () { 
    // refs.modalwindow.classList.add('is-open');
};
