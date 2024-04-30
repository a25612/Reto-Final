function expandirRecuadro() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.add('expanded');
    document.getElementById('expansion').style.display = 'block';
    document.getElementById('direccionInput').style.display = 'none'; // Oculta el desplegable de PICK UP
}

function recoger() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.add('expanded');
    document.getElementById('expansion').style.display = 'none'; // Oculta el input de dirección
    document.getElementById('direccionInput').style.display = 'block'; // Muestra el desplegable de PICK UP
}

function aceptarDireccion() {
    var direccionInput = document.getElementById('direccion');
    var direccion = direccionInput.value;
    console.log('Dirección ingresada:', direccion);
    direccionInput.value = '';
}