window.addEventListener('DOMContentLoaded', (event) => {
    const getEmployees = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.FIND_ALL';
        try {
            const response = await fetch(url);
            console.log('Fetching employees from:', url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const employees = await response.json();
            console.log('Received employees:', employees); // Verificar los datos recibidos
            displayEmployees(employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            alert(`Error fetching employees: ${error.message}`);
        }
    };

    const displayEmployees = (employees) => {
        const employeeList = document.querySelector('#employees_table tbody');
        if (!employeeList) {
            console.error("Element with id 'employees_table' not found.");
            return;
        }
        employees.sort((a, b) => a.Id_Empleado - b.Id_Empleado);
        employeeList.innerHTML = '';

        employees.forEach(employee => {
            console.log('Employee:', employee); // Verificar cada objeto empleado

            const row = document.createElement('tr');

            const employeeDetails = `
                <td>${employee.Id_Empleado}</td>
                <td>${employee.nombre}</td>
                <td>${employee.apellidos}</td>
                <td>${employee.DNI}</td>
                <td>${employee.telefono}</td>
                <td>${employee.cargo}</td>
                <td>
                    <button class="action-button update" data-id="${employee.Id_Empleado}">UPDATE</button>
                </td>
            `;
            row.innerHTML = employeeDetails;
            employeeList.appendChild(row);
        });

        document.querySelectorAll('.action-button.update').forEach(button => {
            button.addEventListener('click', (event) => {
                const employeeId = event.target.getAttribute('data-id');
                const employee = employees.find(e => e.Id_Empleado === parseInt(employeeId));
                if (employee) {
                    const employeeName = prompt('Ingrese el nombre del empleado:', employee.nombre);
                    const employeeSurname = prompt('Ingrese los apellidos del empleado:', employee.apellidos);
                    const employeeDNI = prompt('Ingrese el DNI del empleado:', employee.DNI);
                    const employeePhone = prompt('Ingrese el teléfono del empleado:', employee.telefono);
                    const employeePosition = prompt('Ingrese el cargo del empleado:', employee.cargo);
                    if (employeeName && employeeSurname && employeeDNI && employeePhone && employeePosition) {
                        updateEmployee({
                            Id_Empleado: employee.Id_Empleado,
                            nombre: employeeName,
                            apellidos: employeeSurname,
                            DNI: employeeDNI,
                            telefono: employeePhone,
                            cargo: employeePosition
                        });
                    } else {
                        alert('Debe ingresar todos los campos.');
                    }
                } else {
                    alert('Empleado no encontrado.');
                }
            });
        });
    };

    const addEmployee = async (employee) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.ADD&ID_EMPLEADO=${employee.Id_Empleado}&NOMBRE=${employee.nombre}&APELLIDOS=${employee.apellidos}&DNI=${employee.DNI}&TELEFONO=${employee.telefono}&CARGO=${employee.cargo}`;
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                alert('Empleado añadido exitosamente.');
                getEmployees();
            } else {
                throw new Error('Error al añadir empleado.');
            }
        } catch (error) {
            console.error('Error al añadir empleado:', error);
            alert(`Error al añadir empleado: ${error.message}`);
        }
    };

    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', () => {
        const employeeId = prompt('Ingrese el ID del empleado:');
        const employeeName = prompt('Ingrese el nombre del empleado:');
        const employeeSurname = prompt('Ingrese los apellidos del empleado:');
        const employeeDNI = prompt('Ingrese el DNI del empleado:');
        const employeePhone = prompt('Ingrese el teléfono del empleado:');
        const employeePosition = prompt('Ingrese el cargo del empleado:');
        if (employeeId.trim() !== '' && employeeName.trim() !== '' && employeeSurname.trim() !== '' && employeeDNI.trim() !== '' && employeePhone.trim() !== '' && employeePosition.trim() !== '') {
            const employeeData = { Id_Empleado: employeeId, nombre: employeeName, apellidos: employeeSurname, DNI: employeeDNI, telefono: employeePhone, cargo: employeePosition };
            addEmployee(employeeData);
        } else {
            alert('Debe ingresar datos válidos.');
        }
    });

    const deleteEmployee = async (employeeId) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.DELETE&ID_EMPLEADO=${employeeId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                alert('Empleado eliminado exitosamente.');
                getEmployees();
            } else {
                throw new Error('Error al eliminar empleado.');
            }
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            alert(`Error al eliminar empleado: ${error.message}`);
        }
    };

    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', () => {
        const employeeId = prompt('Ingrese el ID del empleado que desea eliminar:');
        if (employeeId !== null && employeeId.trim() !== '') {
            deleteEmployee(employeeId);
        } else {
            alert('Debe ingresar un ID válido.');
        }
    });

    const updateEmployee = async (employee) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.UPDATE&ID_EMPLEADO=${employee.Id_Empleado}&NOMBRE=${employee.nombre}&APELLIDOS=${employee.apellidos}&DNI=${employee.DNI}&TELEFONO=${employee.telefono}&CARGO=${employee.cargo}`;
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                alert('Empleado actualizado exitosamente.');
                getEmployees();
            } else {
                throw new Error('Error al actualizar empleado.');
            }
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            alert(`Error al actualizar empleado: ${error.message}`);
        }
    };

    getEmployees();
});
