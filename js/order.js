function expandirRecuadro() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.add('expanded');
    document.getElementById('expansion').style.display = 'block'; 
}

function recoger() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.remove('expanded');
    document.getElementById('expansion').style.display = 'none'; 
}

function aceptarDireccion() {
    var direccionInput = document.getElementById('direccion');
    var direccion = direccionInput.value;
    console.log('Dirección ingresada:', direccion);
    direccionInput.value = '';
}