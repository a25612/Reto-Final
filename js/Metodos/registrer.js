document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('new-username').value.trim();
        const email = document.getElementById('new-email').value.trim();
        const password = document.getElementById('new-password').value.trim();
        const phone = document.getElementById('phone').value.trim();

        console.log('Username:', username); // Depuración
        console.log('Email:', email); // Depuración
        console.log('Password:', password); // Depuración
        console.log('Phone:', phone); // Depuración

        if (username && email && password && phone) {
            try {
                // Obtener el último ID de cliente
                const urlFindAll = 'http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.FIND_ALL';
                const responseFindAll = await fetch(urlFindAll);
                if (!responseFindAll.ok) {
                    throw new Error('Error al obtener la lista de clientes.');
                }
                const clientes = await responseFindAll.json();
                console.log('Clientes:', clientes); // Depuración

                // Verificar si hay clientes y que los IDs sean válidos
                let lastId = 0;
                if (clientes.length > 0) {
                    const ids = clientes.map(cliente => cliente.Id_Cliente).filter(id => !isNaN(id));
                    if (ids.length > 0) {
                        lastId = Math.max(...ids);
                    }
                }
                const nextId = lastId + 1;
                console.log('Next ID:', nextId); // Depuración

                // Crear el nuevo cliente
                const user = {
                    Id_Cliente: nextId,
                    nombre: username,
                    email: email,
                    password: password,
                    telefono: phone
                };

                console.log('Nuevo cliente:', user); // Depuración

                // Enviar solicitud para añadir el nuevo cliente
                const urlAdd = `http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.ADD&ID_CLIENTE=${user.Id_Cliente}&NOMBRE=${encodeURIComponent(user.nombre)}&EMAIL=${encodeURIComponent(user.email)}&PASSWORD=${encodeURIComponent(user.password)}&TELEFONO=${encodeURIComponent(user.telefono)}`;
                console.log('URL Add:', urlAdd); // Depuración

                const responseAdd = await fetch(urlAdd, { method: 'POST' });
                if (responseAdd.ok) {
                    alert('Usuario registrado exitosamente.');
                    document.getElementById('register-form').reset();
                } else {
                    const errorText = await responseAdd.text();
                    console.error('Error al registrar usuario:', errorText); // Depuración
                    throw new Error(`Error al registrar usuario: ${errorText}`);
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                alert(`Error al registrar usuario: ${error.message}`);
            }
        } else {
            alert('Todos los campos son obligatorios.');
        }
    });
});

