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
                // Asignar ID_CLIENTE manualmente
                const nextId = 3; // Cambia este valor si es necesario
                console.log('Next ID:', nextId); // Depuración

                // Crear el nuevo cliente
                const user = {
                    ID_CLIENTE: nextId,
                    NOMBRE: username,
                    EMAIL: email,
                    CONTRASENA: password,
                    TELEFONO: phone
                };

                console.log('Nuevo cliente:', user); // Depuración

                // Enviar solicitud para añadir el nuevo cliente
                const urlAdd = `http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.ADD&ID_CLIENTE=${encodeURIComponent(user.ID_CLIENTE)}&NOMBRE=${encodeURIComponent(user.NOMBRE)}&EMAIL=${encodeURIComponent(user.EMAIL)}&CONTRASENA=${encodeURIComponent(user.CONTRASENA)}&TELEFONO=${encodeURIComponent(user.TELEFONO)}`;
                console.log('URL Add:', urlAdd); // Depuración

                const responseAdd = await fetch(urlAdd, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                });

                if (responseAdd.ok) {
                    alert('Usuario registrado exitosamente.');
                    document.getElementById('register-form').reset();
                    window.location.href = "/html/login.html"; 
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
