window.addEventListener('DOMContentLoaded', (event) => {

    const fetchClientes = async () => {
        for (let i = 1; i <= 30; i++) {
            await getCliente(i);
        }
    }

    /** Método para hacer la petición a la API y obtener el json de resultados */
    const getCliente = async (id) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.FIND_ALL`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching Cliente with ID: ${id}`);
            const cliente = await response.json();
            console.log(cliente);
            createClienteItem(cliente);
        } catch (error) {
            console.error(error);
        }
    }

    /** Método para crear el HTML del Elemento Cliente */
    const createClienteItem = (cliente) => {
        console.log('createClienteItem => ', cliente);
        const cliente_list = document.querySelector('#cliente_list');
        const card = document.createElement('div');
        card.classList.add('card');

        const { id_cliente, nombre, email, telefono } = cliente;

        card.innerHTML = `
            <div class="card-header"></div>
            <div class="card-body">
                <a class="card-body-title clickable" href="detail.html?id=${id_cliente}">
                    ${nombre}
                </a>
                <p class="card-body-text">${email}</p>
            </div>
            <div class="card-footer">
                <div class="card-footer-social">
                    <h3>${telefono}</h3>
                    <p>Teléfono</p>
                </div>
            </div>`;

        cliente_list.appendChild(card);
    }

    fetchClientes();
});
