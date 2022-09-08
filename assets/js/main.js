/* Database */
const productos = [
    {
        id: 1,
        name: 'Producto #1',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 1500000,
        cantidad: 5
    },
    {
        id: 2,
        name: 'Producto #2',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 2500000,
        cantidad: 10
    },
    {
        id: 3,
        name: 'Producto #3',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 1800000,
        cantidad: 8
    },
    {
        id: 4,
        name: 'Producto #4',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 2100000,
        cantidad: 21
    }
];
let carrito = [
];

/* Productos */
function pintarProductos() {
    let innertHtml = '';
    let list_products = document.getElementById('list-products');
    for(let producto of productos) {
        innertHtml += `
            <div class="card-product">
                <img src="${producto.imageUrl}" alt="" class="card-product-image">
                <div class="card-product-body">
                    <h4 class="card-product-title">${producto.name}</h4>
                    <h5> ${producto.cantidad} unidades disponibles </h5>
                    <p class="card-product-price"> ${producto.price.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})} </p>
                    <button class="card-product-button"> <i class="fa-solid fa-plus fa-xl add-product" data-id="${producto.id}"></i> </button>
                </div>
            </div>
        `;
    }
    list_products.innerHTML = innertHtml;
}

/* Carrito */
function agregarAlCarrito(id) {
    const articuloEncontrado = productos.find( producto => producto.id == id);
    if(articuloEncontrado?.cantidad > 0) {
        const aritculoEnCarrito = carrito.find( producto => producto.id == id);
        if( !aritculoEnCarrito ){
            carrito.push({id, cantidad: 1});
            actualizarDatos();
        } else {
            monstrarAlerta('El producto ya se encuentra en el carrito');
        }
    } else {
        monstrarAlerta('No hay existencias del producto');
    }
}

function removerDelCarrito(id) {
    carrito = carrito.filter( producto => producto.id != id);
    monstrarAlerta('Se ha eliminado un producto del carrito');
}

function aumentarCantidadProductoCarrito(id) {
    const aritculoEnCarrito = carrito.find( producto => producto.id == id);
    const articuloEncontrado = productos.find( producto => producto.id == id);
    
    if( aritculoEnCarrito?.cantidad + 1 < articuloEncontrado?.cantidad) {
        aritculoEnCarrito.cantidad++;
        articuloEncontrado.cantidad--;
    } else {
        monstrarAlerta('No hay existencias del producto');
    }
}

function disminuirCantidadProductoCarrito(id) {
    const aritculoEnCarrito = carrito.find( producto => producto.id == id);
    const articuloEncontrado = productos.find( producto => producto.id == id);
    
    if( aritculoEnCarrito?.cantidad > 0) {
        aritculoEnCarrito.cantidad--;
        articuloEncontrado.cantidad++;
    } else {
        removerDelCarrito(id);
    }
}

function contarArticulos() {
    let totalArticulos = 0;
    for( let producto of carrito ) {
        totalArticulos += producto.cantidad;
    }
    return totalArticulos;
}

function total() {
    let suma = 0;
    for( let productoCarrito of carrito ) {
        const productoEcontrado = productos.find( producto => producto.id == productoCarrito.id );
        suma += productoEcontrado.price * productoCarrito.cantidad;
    }
    return suma;
}

function comprar() {
    for( let productoCarrito of carrito ) {
        let productoEcontrado = productos.find( producto => producto.id == productoCarrito.id );
        productoEcontrado.cantidad -= productoCarrito.cantidad;
    }
    monstrarAlerta('Se ha realizado una compra exitosa');
    carrito = [];
}

function actualizarDatos() {
    const element_price = document.getElementById('element_price');
    element_price.innerHTML = total().toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});

    const element_count = document.getElementById('element_count');
    element_count.innerHTML = `${contarArticulos()} items`;

    let innertHtml = '';
    const cart = document.getElementById('cart-list');
    for(let productoCarrito of carrito ) {
        const producto = productos.find( p => p.id == productoCarrito.id );
        console.log( producto );
        innertHtml += `
            <div class="card-product">
                <img src="${producto.imageUrl}" alt="" class="card-product-image">
                <div class="card-product-body">
                    <h4 class="card-product-title">${producto.name}</h4>
                    <h5> ${producto.cantidad} unidades disponibles </h5>
                    <p class="card-product-price"> ${producto.price.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2})} </p>
                    <button class="card-product-button"> <i class="fa-solid fa-plus fa-xl add-product" data-id="${producto.id}"></i> </button>
                </div>
            </div>
        `;
    }
    cart.innerHTML = innertHtml;

}

function monstrarAlerta( message = 'Ocurrio un error' ) {
    const messages = document.getElementById('messages');
    messages.innerHTML = `
        <div class="message">
            <p class="message-text">${message}</p>
        </div>
    `;
    setTimeout(() => {
        messages.innerHTML=''
    }, 5000);
     
}

pintarProductos();
actualizarDatos();

const list_products = document.getElementById('list-products');
list_products.addEventListener('click', (e) => {
    if(e.target.classList.contains('add-product')){
        const id = e.target.dataset.id;
        agregarAlCarrito(+id);
    }

});

const shopping_cart = document.getElementById('shopping-cart');
const shopping_cart_open = document.getElementById('shopping_cart_open');
shopping_cart_open.addEventListener('click', () => {
    shopping_cart.classList.add('show');
});

const shopping_cart_close = document.getElementById('shopping-cart-close');
shopping_cart.addEventListener('click', () => {
    shopping_cart.classList.remove('show');
});


const container = document.querySelector('.nav')
const menu = document.getElementById('nav_menu')

container.addEventListener('click', function (e) {
  if(e.target.matches('.nav_open_icon')) {
    menu.classList.add('show');
  }

  if(e.target.matches('.nav_close_icon')) {
    menu.classList.remove('show');
  }

  if (e.target.matches('.nav_link')) {
    menu.classList.remove('show');
  }
})