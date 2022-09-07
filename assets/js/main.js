/* Database */
const productos = [
    {
        id: 1,
        name: 'Producto #1',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 1500000
    },
    {
        id: 2,
        name: 'Producto #2',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 2500000
    },
    {
        id: 3,
        name: 'Producto #3',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 1800000
    },
    {
        id: 4,
        name: 'Producto #4',
        imageUrl: './assets/img/t-shirt.jpg',
        price: 2100000
    }
];
let carrito = [];

/* Productos */
function pintarProductos() {
    let innertHtml = '';
    let list_products = document.getElementById('list-products');
    for(let producto of productos) {
        innertHtml += `
            <div class="card-product">
                <img src="${producto.imageUrl}" alt="" class="card-product-image">
                <div class="card-product-body">
                    <h5 class="card-product-title">${producto.name}</h5>
                    <p class="card-product-price"> ${producto.price.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 2})} </p>
                    <button class="card-product-add-button" onclick="agregarAlCarrito(${producto.id})"> <i class="fa-solid fa-plus fa-xl"></i> </button>
                </div>
            </div>
        `;
    }
    list_products.innerHTML = innertHtml;
}

/* Carrito */
function agregarAlCarrito(id) {
    alert(`Producto ${id} agregado al carrito`);
}

function removerDelCarrito(id) {

}