const btnAdd = document.querySelectorAll('.btn-add');
const items = document.getElementById('items');
const toPay = document.getElementById('toPay');
// console.log(items);
// const templateCart = document.getElementById('templateCart').content;
// const templateToPay = document.getElementById('templateToPay').content;
// const fragment = document.createDocumentFragment();

let cart = [];

window.onload = ()=>{
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        setToCart();
    }
}

for (let i = 0; i < btnAdd.length; i++) {
    let product = btnAdd[i];
    
    product.dataset.id = i+1;
    product.addEventListener('click', e =>{
        addToCart(e.target.closest('.single-service'));
        console.log(e.target.closest('.single-service'));
    });
}

const addToCart = data =>{
    id = data.querySelector('.btn-add').dataset.id;
    title  = data.querySelector('h5').textContent;
    image  = data.querySelector('img').getAttribute('src');
    price = data.querySelector('p').textContent;
    category = data.querySelectorAll('input')[0].value;
    description = data.querySelectorAll('input')[1].value;

    const newProduct = {
        id,
        title,
        image,
        price,
        category,
        description
    }
    addNewProduct(newProduct);
}

const addNewProduct = newProduct =>{

    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === newProduct.id){
            return;
        }
        
    }

    // cart[newProduct.id] = {...newProduct};
    cart.push(newProduct);
    // console.log(cart);
    setToCart();
}

const setToCart = ()=> {

    // console.log(cart);
    items.innerHTML = '';
    cart.forEach(item =>{
        const div = document.createElement('div');
        const content = `
        
        <div class="row">

            <div class="row">
                <div class="col-lg-12 d-flex justify-content-end">
                    <h6 class="delete" data-id="${item.id}" style="cursor: pointer;">x</h6>
                </div>
                

                <div class="col-lg-4 text-center">
                    <img src="${item.image}" alt="imagen" class="" style="height: 100px;">
                </div>
                <div class="col-lg-8 d-flex align-items-center">
                    <p>${item.description}</p>
                </div>
                <hr class="my-3">
            </div>

            
        </div>
        `
        div.innerHTML = content;
        items.appendChild(div);

        div.querySelector('.delete').addEventListener('click',removeProduct);
    });
    cartToPay();

    localStorage.setItem('cart',JSON.stringify(cart));

    // items.innerHTML = '';
    // Object.values(cart).forEach(product => {
    //     templateCart.querySelector('img').setAttribute('src',product.image);
    //     templateCart.querySelector('h5').textContent = product.title;
    //     templateCart.querySelector('em').textContent = product.category;
    //     templateCart.querySelectorAll('td')[1].textContent = product.price;
    //     templateCart.querySelector('.btn-danger').dataset.id = product.id;

    //     const clone = templateCart.cloneNode(true); 
    //     fragment.appendChild(clone);
    // });

    // items.appendChild(fragment);
    // cartToPay();

    // localStorage.setItem('cart',JSON.stringify(cart));
}

const cartToPay = () =>{
    
    // toPay.innerHTML = '';
    const price = Object.values(cart).reduce((acum, { price }) => acum + 1 * price, 0);
    const itmb = price * 0.07;
    const nPrecio = (price + itmb).toFixed(2);

    toPay.innerHTML = `
    <div class="row">
        <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
            <p class="d-inline">Sub Total</p>
            <p class=""><span>B/.</span> ${price}</p>
        </div>
        <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
            <p class="d-inline">+ Itbms</p>
            <p class="">7%</p>
        </div>
        <div class="col-lg-12 px-4 d-flex justify-content-between">
            <h4 class="d-inline">Total</h4>
            <h4 class=""><span>B/.</span> ${nPrecio}</h4>
        </div>

        <hr class="my-3">
    </div>

    <div class="">
        <div class="col-lg-12 mb-3">
            <p>¿Tienes algún cupón o tarjeta de regalo?</p>
        </div>
        <div class="col-lg-12">
            <p>¿Te falta algún curso? <a href="/tienda" class="font-weight-bold" style="color: #3763EB !important;">Sigue comprando</a></p>
        </div>
    </div>
    `


    // templateToPay.querySelector('h6').textContent = nPrecio;

    // const clone = templateToPay.cloneNode(true);
    // fragment.appendChild(clone);
    // toPay.appendChild(fragment);
}

// items.addEventListener('click', e =>{
//     removeProduct(e);
// });

const removeProduct = e =>{
    
    // console.log(e.target.closest('tr'));
    const id = e.target.dataset.id;

    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === id){
            cart.splice(i,1);
            setToCart();
        }
    }
    
    // if(e.target.classList.contains('btn-danger')){
    //     delete cart[e.target.dataset.id];
    // }
    // setToCart();
    // e.stopPropagation();
}