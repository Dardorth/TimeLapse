const payProduct = ()=>{

    const productsCart = [];

    cart.forEach(item => {
        productsCart.push(item.title);
    });

    // console.log(cart);

    // cart.forEach(product => {

    // });


    // console.log(productsCart);

    // location.href = `/perfil/${productsCart}`;

    // renderCart();
}

const renderCart = ()=>{
    if(localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart = [];
        localStorage.setItem('cart',JSON.stringify(cart));
    }
}