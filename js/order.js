function expandirRecuadro() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.add('expanded');
    document.getElementById('expansion').style.display = 'block';
    document.getElementById('direccionInput').style.display = 'none'; 
}

function recoger() {
    var recuadro = document.getElementById('recuadro');
    recuadro.classList.add('expanded');
    document.getElementById('expansion').style.display = 'none'; 
    document.getElementById('direccionInput').style.display = 'block'; 
}

function aceptarDireccion() {
    var direccionInput = document.getElementById('direccion');
    var direccion = direccionInput.value.trim(); 

    var esPedidoADomicilio = document.getElementById('expansion').style.display !== 'none';
    
    if (direccion === '' && esPedidoADomicilio) {
        alert('Por favor ingresa una dirección.');
        return; 
    }

    console.log('Dirección ingresada:', direccion);
    direccionInput.value = '';
    window.location.href = 'carta.html';
}
