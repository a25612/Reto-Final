window.addEventListener('DOMContentLoaded', (event) => {
    const getProducts = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.FIND_ALL';
        try {
            const response = await fetch(url);
            const products = await response.json();
    
            // Imprimir los productos en la consola para verificar la respuesta
            console.log('Products fetched:', products);
    
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    const displayProducts = (products) => {
        products.sort((a, b) => a.Id_Producto - b.Id_Producto);
        const productList = document.querySelector('#products_table tbody');
        productList.innerHTML = '';
    
        products.forEach(product => {
            const row = document.createElement('tr');
    
            // Verificar si el precio está definido y es un número
            const precio = (typeof product.Precio === 'number') ? product.Precio.toFixed(2) : 'N/A';
    
            const productDetails = `
                <td>${product.Id_Producto}</td>
                <td>${product.Nombre}</td>
                <td>${product.Descripcion}</td>
                <td>${precio}</td>
                <td>${product.Id_Tipo}</td>
                <td>
                    <button class="action-button view">UPDATE</button>
                </td>
            `;
            row.innerHTML = productDetails;
            productList.appendChild(row);
        });
    };
    

    const deleteProduct = async (productId) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.DELETE&ID_PRODUCTO=${productId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                alert('Producto eliminado exitosamente.');
                getProducts();
            } else {
                throw new Error('Error al eliminar producto.');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    const addProduct = async (productId, productName, productDescription, productPrice, productType) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=PRODUCTOS.ADD&ID_PRODUCTO=${productId}&NOMBRE=${productName}&DESCRIPCION=${productDescription}&PRECIO=${productPrice}&ID_TIPO=${productType}`;
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                alert('Producto añadido exitosamente.');
                getProducts();
            } else {
                throw new Error('Error al añadir producto.');
            }
        } catch (error) {
            console.error('Error al añadir producto:', error);
        }
    };

    // Evento para eliminar un producto
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
        const productId = prompt('Ingrese el ID del producto que desea eliminar:');
        if (productId !== null && productId.trim() !== '') {
            deleteProduct(productId);
        } else {
            alert('Debe ingresar un ID válido.');
        }
    });

    // Evento para añadir un producto
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
        const productId = prompt('Ingrese el ID del producto:');
        const productName = prompt('Ingrese el nombre del producto:');
        const productDescription = prompt('Ingrese la descripción del producto:');
        const productPrice = prompt('Ingrese el precio del producto:');
        const productType = prompt('Ingrese el ID del tipo de producto:');
        if (productId.trim() !== '' && productName.trim() !== '' && productDescription.trim() !== '' && productPrice.trim() !== '' && productType.trim() !== '') {
            addProduct(productId, productName, productDescription, productPrice, productType);
        } else {
            alert('Debe ingresar todos los campos.');
        }
    });

    getProducts();
});