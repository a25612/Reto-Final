
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
    carrito.push({ nombre: nombre, precio: precio });
    total += precio;
    renderCarrito();
    mostrarCarrito(); // Solo se llama cuando se agrega un producto
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
        
        var buttonLess = document.createElement('button');
        buttonLess.textContent = '-';
        buttonLess.onclick = function() {
            removeFromCart(producto); // Llama a la función para eliminar el producto específico
        };
        
        listItem.appendChild(buttonLess);
        listaCarrito.appendChild(listItem);
    });
    
    // Mostrar el total del carrito
    totalCarrito.textContent = '$' + total.toFixed(2);
}
function removeFromCart(producto) {
    var index = carrito.indexOf(producto); // Obtiene el índice del producto en el carrito
    if (index !== -1) {
        total -= producto.precio; // Restar el precio del producto al total
        carrito.splice(index, 1); // Eliminar el producto del carrito
        renderCarrito(); // Volver a renderizar el carrito
        mostrarCarrito(); // Mostrar el carrito si hay productos en él
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    total = 0;
    renderCarrito();
    mostrarCarrito();
}

var carritoVisible = true; // Variable para controlar la visibilidad del carrito

// Función para alternar la visibilidad del carrito
function toggleCarrito() {
    var carritoCampo = document.getElementById('carritoCampo');
    if (carritoVisible) {
        carritoCampo.style.display = 'none'; // Ocultar el carrito
    } else {
        carritoCampo.style.display = 'block'; // Mostrar el carrito
    }
    carritoVisible = !carritoVisible; // Cambiar el estado de la variable
}