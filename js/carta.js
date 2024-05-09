var carrito = []; // Array para almacenar los productos
var total = 0; // Variable para almacenar el total del carrito

// Función para mostrar el carrito si hay elementos en él
function mostrarCarrito() {
    var carritoCampo = document.getElementById('carritoCampo');
    if (carrito.length > 0) {
        carritoCampo.style.display = 'block';
    } else {
        carritoCampo.style.display = 'none';
    }
}

// Función para agregar un producto al carrito
function addToCart(nombre, precio) {
    carrito.push({nombre: nombre, precio: precio});
    total += precio;
    renderCarrito();
    mostrarCarrito();
}

// Función para renderizar el carrito
function renderCarrito() {
    var listaCarrito = document.getElementById('listaCarrito');
    var totalCarrito = document.getElementById('totalCarrito');
    
    // Limpiar la lista del carrito antes de renderizarla nuevamente
    listaCarrito.innerHTML = '';
    
    // Recorrer el array de productos y agregar cada uno a la lista del carrito
    carrito.forEach(function(producto) {
        var listItem = document.createElement('li');
        listItem.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(listItem);
    });
    
    // Mostrar el total del carrito
    totalCarrito.textContent = '$' + total.toFixed(2);
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    total = 0;
    renderCarrito();
    mostrarCarrito();
}