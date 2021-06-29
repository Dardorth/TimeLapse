const btnAdd = document.querySelectorAll('.btn-add');
const items = document.getElementById('items');
const toPay = document.getElementById('toPay');
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
        const tr = document.createElement('tr');
        const content = `
        <tr>
            <td>
                <div class="row align-items-center">
                    <div class="col-lg-2 col-md-4 col-6">
                        <img src="${item.image}" alt="#" style="height:80px;">
                    </div>
                    <div class="col-lg-10 col-md-8 col-6">
                        <h5 class="product-name">${item.title}</h5>
                        <p class="product-des">
                            <span> Categoria: <em>${item.category}</em> </span>
                        </p>
                    </div>
                </div>
            </td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-danger" data-id="${item.id}">Eliminar</button>
            </td>
        </tr>
        `
        tr.innerHTML = content;
        items.appendChild(tr);

        tr.querySelector('button').addEventListener('click',removeProduct);
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
    const nPrecio = Object.values(cart).reduce((acum, { price }) => acum + 1 * price, 0);

    toPay.innerHTML = `
        <h3 class="">Totales</h3>
        <br>
        <p class="">
        <h6>${nPrecio}</h6>
        </p>
        <br>
        <div class="button">
            <a href="/checkout" class="btn">Realizar pedido</a>
            <br><br>
            <a href="/tienda" class="btn btn-alt">Continuar Comprando</a>
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