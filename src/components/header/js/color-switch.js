const orangeBtn = document.querySelector('.orange-btn');
const blueBtn = document.querySelector('.blue-btn');
// const orange = document.querySelectorAll('.orange')
const universalSelector = document.getElementsByTagName("body");

// console.log(orange);
function colorSwither() {
    const orange = document.getElementsByClassName('orange')
    for (let i = 0; i < orange.length; i++) {
     orange[i].classList.add('blue');
        orange[i].classList.remove('orange');
    }
}

colorSwither()