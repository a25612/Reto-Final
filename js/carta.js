document.addEventListener('DOMContentLoaded', (event) => {
    const getProductos = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.FIND_ALL';
        try {
            const response = await fetch(url);
            console.log('Fetching productos from:', url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const productos = await response.json();
            console.log('Received productos:', productos); // Log the entire response

            if (productos.length > 0) {
                console.log('Sample producto structure:', productos[0]); // Log structure of the first product
            }

            displayProductos(productos);
        } catch (error) {
            console.error('Error fetching productos:', error);
            alert(`Error fetching productos: ${error.message}`);
        }
    };

    const displayProductos = (productos) => {
        const productosContenedor = document.querySelector('#productosContenedor');
        if (!productosContenedor) {
            console.error("Element with id 'productosContenedor' not found.");
            return;
        }
        productosContenedor.innerHTML = '';

        productos.forEach(producto => {
            if (!producto) {
                console.error('Producto is undefined:', producto);
                return;
            }

            console.log('Producto:', producto); // Verificar cada objeto producto

            if (!producto.Nombre || !producto.Descripcion || producto.Precio === undefined) {
                console.error('Producto with missing properties:', producto);
                return;
            }

            const productoDiv = document.createElement('div');
            productoDiv.className = 'menu-item';

            const precio = producto.Precio !== undefined ? producto.Precio.toFixed(2) : '0.00';

            const productoDetails = `
                <div class="item">
                    <h3>${producto.Nombre}</h3>
                    <p>${producto.Descripcion}</p>
                    <p>${precio}€ <button class="carrito" onclick="addToCart('${producto.Nombre}', ${producto.Precio})">+</button></p>
                </div>
            `;
            productoDiv.innerHTML = productoDetails;
            productosContenedor.appendChild(productoDiv);
        });
    };

    // Llamada a la función para obtener productos
    getProductos();
});

var carrito = []; // Array para almacenar los productos
var total = 0; // Variable para almacenar el total del carrito
var carritoVisible = false; // Estado de visibilidad del carrito

// Función para mostrar el carrito si hay elementos en él
function mostrarCarrito() {
    var carritoCampo = document.getElementById('carritoCampo');
    carritoCampo.style.display = carrito.length > 0 ? 'block' : 'none';
}

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

// Función para alternar la visibilidad del carrito y su contenedor
function toggleCarrito() {
    var carritoCampo = document.getElementById('carritoCampo');
    var carritoContenedor = document.getElementById('carritoContenedor');
    
    carritoCampo.style.display = carritoVisible ? 'none' : 'block';
    carritoContenedor.style.display = carritoVisible ? 'none' : 'block';
    
    carritoVisible = !carritoVisible; // Cambiar el estado de la variable
}

// Función para que se desplace suavemente hasta la seccion seleccionada
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Función para que el pedido mínimo sea de 15€
function pagarCarrito() {
    if (total >= 15) {
        // Se redirigirá a la página de pago
        window.location.href = "/html/pago.html";
    } else {
        alert('El total del pedido debe ser al menos 15€ para poder continuar');
    }
}
