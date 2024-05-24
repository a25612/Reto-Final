window.addEventListener('DOMContentLoaded', (event) => {
    const getClients = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.FIND_ALL';
        try {
            const response = await fetch(url);
            const clients = await response.json();
            displayClients(clients);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const displayClients = (clients) => {
        clients.sort((a, b) => a.id_cliente - b.id_cliente);
        const clientList = document.querySelector('#clients_table tbody');
        clientList.innerHTML = '';

        clients.forEach(client => {
            const row = document.createElement('tr');

            const clientDetails = `
                <td>${client.id_cliente}</td>
                <td>${client.nombre}</td>
                <td>${client.email}</td>
                <td>${client.telefono}</td>
                <td>
                    <button class="action-button view">UPDATE</button>
                </td>
            `;
            row.innerHTML = clientDetails;
            clientList.appendChild(row);
        });
    };

    const deleteClient = async (clientId) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.DELETE&ID_CLIENTE=${clientId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                alert('Cliente eliminado exitosamente.');
                // Volver a cargar la lista de clientes después de eliminar uno
                getClients();
            } else {
                throw new Error('Error al eliminar cliente.');
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    };

    // Agregar evento de clic al botón "DELETE"
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
        const clientId = prompt('Ingrese el ID del cliente que desea eliminar:');
        if (clientId !== null && clientId.trim() !== '') {
            deleteClient(clientId);
        } else {
            alert('Debe ingresar un ID válido.');
        }
    });
    const addClient = async (clientId, clientName, clientEmail, clientPassword, clientPhone) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.ADD&ID_CLIENTE=${clientId}&NOMBRE=${clientName}&EMAIL=${clientEmail}&CONTRASENA=${clientPassword}&TELEFONO=${clientPhone}`;
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                alert('Cliente añadido exitosamente.');
                getClients();
            } else {
                throw new Error('Error al añadir cliente.');
            }
        } catch (error) {
            console.error('Error al añadir cliente:', error);
        }
    };

    // Evento para añadir un cliente al hacer clic en un botón
    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
        // Obtener los valores de los campos de texto
        const clientId = prompt('Ingrese el ID del cliente:');
        const clientName = prompt('Ingrese el nombre del cliente:');
        const clientEmail = prompt('Ingrese el email del cliente:');
        const clientPassword = prompt('Ingrese la contrasena del cliente:');
        const clientPhone = prompt('Ingrese el teléfono del cliente:');
        if (clientId.trim() !== '' && clientName.trim() !== '' && clientEmail.trim() !== '' && clientPassword.trim() !== '' && clientPhone.trim() !== '') {
            const clientData = { id: clientId, name: clientName, email: clientEmail, password: clientPassword, phone: clientPhone };
            addClient(clientData);
        } else {
            alert('Debe ingresar un nombre y un email válidos.');
        }
    });

    getClients();
});