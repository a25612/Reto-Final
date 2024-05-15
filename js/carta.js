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
// Función para agregar un producto al carrito
function addToCart(nombre, precio) {
    var index = carrito.findIndex(producto => producto.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad++; // Incrementar la cantidad si el producto ya está en el carrito
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 }); // Agregar nuevo producto al carrito con cantidad 1
    }
    total += precio;
    renderCarrito();
    if (!carritoVisible) {
        toggleCarrito(); // Mostrar el carrito si está minimizado
    }
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
        
        var nombreProducto = document.createElement('span'); // Nombre del producto
        nombreProducto.textContent = producto.nombre; // Establece el nombre del producto
        listItem.appendChild(nombreProducto);
        
        var buttonLess = document.createElement('button');
        var buttonMore = document.createElement('button');
        
        buttonLess.textContent = '-';
        buttonLess.onclick = function() {
            removeFromCart(producto); // Llama a la función para eliminar el producto específico
        };
        
        var cantidad = document.createElement('span'); // Contador de cantidad
        cantidad.textContent = producto.cantidad; // Establece el valor inicial
        cantidad.style.margin = '0 5px'; // Ajusta el margen para separarlo de los botones
        
        buttonMore.textContent = '+';
        buttonMore.onclick = function() {
            addToCart(producto.nombre, producto.precio); // Llama a la función para agregar más del mismo producto
        };
        
        listItem.appendChild(buttonLess);
        listItem.appendChild(cantidad); // Agrega el contador entre los botones
        listItem.appendChild(buttonMore);
        listaCarrito.appendChild(listItem);
    });
    
    // Mostrar el total del carrito
    totalCarrito.textContent = '$' + total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(producto) {
    var index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        total -= producto.precio; // Restar el precio del producto al total
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--; // Decrementar la cantidad si hay más de un producto del mismo tipo
        } else {
            carrito.splice(index, 1); // Eliminar el producto del carrito si solo hay uno
        }
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

// Función para alternar la visibilidad del carrito y su contenedor
function toggleCarrito() {
    var carritoCampo = document.getElementById('carritoCampo');
    var carritoContenedor = document.getElementById('carritoContenedor');
    
    if (carritoVisible) {
        carritoCampo.style.display = 'none'; // Ocultar el carrito
        carritoContenedor.style.display = 'none'; // Ocultar el contenedor del carrito
    } else {
        carritoCampo.style.display = 'block'; // Mostrar el carrito
        carritoContenedor.style.display = 'block'; // Mostrar el contenedor del carrito
    }
    
    carritoVisible = !carritoVisible; // Cambiar el estado de la variable
}


// Función para que se desplace suavemente hasta la seccion seleccionada
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

