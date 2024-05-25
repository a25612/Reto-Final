window.addEventListener('DOMContentLoaded', (event) => {
    const getEmployees = async () => {
        const url = 'http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.FIND_ALL';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const employees = await response.json();
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
        employees.sort((a, b) => a.id - b.id);
        employeeList.innerHTML = '';

        employees.forEach(employee => {
            console.log(employee); // Imprimir el objeto empleado para verificar los campos

            const row = document.createElement('tr');

            const employeeDetails = `
                <td>${employee.id}</td>
                <td>${employee.nombre}</td>
                <td>${employee.apellidos}</td>
                <td>${employee.dni}</td>
                <td>${employee.telefono}</td>
                <td>${employee.cargo}</td>
                <td>
                    <button class="action-button view">UPDATE</button>
                </td>
            `;
            row.innerHTML = employeeDetails;
            employeeList.appendChild(row);
        });
    };

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

    const addEmployee = async (employee) => {
        const url = `http://localhost:8080/Xeneburguer/Controller?ACTION=EMPLEADOS.ADD&ID_EMPLEADO=${employee.id}&NOMBRE=${employee.name}&APELLIDOS=${employee.surname}&DNI=${employee.dni}&TELEFONO=${employee.phone}&CARGO=${employee.position}`;
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
            const employeeData = { id: employeeId, name: employeeName, surname: employeeSurname, dni: employeeDNI, phone: employeePhone, position: employeePosition };
            addEmployee(employeeData);
        } else {
            alert('Debe ingresar datos válidos.');
        }
    });

    getEmployees();
});
