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
    nameOpt.style.backgroundColor = "grey";
    rollOpt.style.background = "transparent";
    cityOpt.style.background = "transparent";
});
rollOpt.addEventListener('click', ()=>{
    nameSrch.classList.remove('front');
    addSrch.classList.add('front');
    citySrch.classList.remove('front');
     rollOpt.style.backgroundColor = "grey";
    nameOpt.style.background = "transparent";
    cityOpt.style.background = "transparent";
});
cityOpt.addEventListener('click', ()=>{
    nameSrch.classList.remove('front');
    addSrch.classList.remove('front');
    citySrch.classList.add('front');
     cityOpt.style.backgroundColor = "grey";
    rollOpt.style.background = "transparent";
    nameOpt.style.background = "transparent";
});

