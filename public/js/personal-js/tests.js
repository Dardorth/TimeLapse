/*======================================
	JS Franklin - Cursos (Prueba 1)
========================================*/

// imágenes del modal para la prueba
const img1 = document.getElementById('p1_i1');
const img2 = document.getElementById('p1_i2');
const img3 = document.getElementById('p1_i3');

// Respuesta en el modal para errores
const res = document.getElementById('p1_res');

img1.addEventListener('click',()=>{
    res.innerHTML = 'Enserio te equivocaste con esta vaina? xuxa madre loco';
    res.classList.add('text-danger');
});

img2.addEventListener('click',()=>{
    res.innerHTML = 'imbécil';
    res.classList.add('text-danger');
});