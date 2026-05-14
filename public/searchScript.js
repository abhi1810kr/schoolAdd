const nameOpt = document.querySelector('.nameOpt');
const rollOpt = document.querySelector('.rollOpt');
const cityOpt = document.querySelector('.cityOpt');


const addSrch = document.querySelector('.addSrch');

const citySrch = document.querySelector('.citySrch');

const nameSrch = document.querySelector('.nameSrch');

nameOpt.addEventListener('click', ()=>{
    nameSrch.classList.add('front');
    addSrch.classList.remove('front');
    citySrch.classList.remove('front');
});
rollOpt.addEventListener('click', ()=>{
    nameSrch.classList.remove('front');
    addSrch.classList.add('front');
    citySrch.classList.remove('front');
});
cityOpt.addEventListener('click', ()=>{
    nameSrch.classList.remove('front');
    addSrch.classList.remove('front');
    citySrch.classList.add('front');
});

