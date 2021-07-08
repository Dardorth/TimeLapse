/*======================================
	JS Franklin - Cursos (Prueba 1)
========================================*/

// imágenes del modal para la prueba
const img1 = document.getElementById('p1_i1');
const img2 = document.getElementById('p1_i2');
const img3 = document.getElementById('p1_i3');

// Respuestas en el modal
const res = document.getElementById('p1_res');
const paso1 = document.getElementById('p1_p1');

// Btns de para acceder a los pasos
const btn1 = document.getElementById('p1_btn1');
const check1 = document.getElementById('p1_check1');

let = prueba1 = [];

// form
paso1.addEventListener('submit', e=>{
    e.preventDefault();
    correctAnswer();
});

img1.addEventListener('click',()=>{
    res.innerHTML = 'Enserio te equivocaste con esta vaina? xuxa madre loco';
    res.classList.add('text-danger');
});

img2.addEventListener('click',()=>{
    res.innerHTML = 'imbécil';
    res.classList.add('text-danger');
});

const correctAnswer = ()=>{
    prueba1.push(1);
    localStorage.setItem('test1',JSON.stringify(prueba1));
    paso1.submit();
}

// Validar LocalStorage
let checks = [];
checks = JSON.parse(localStorage.getItem('test1'));

if (checks[0] === 1) {
    btn1.classList.add('d-none');
    check1.classList.remove('d-none');
}