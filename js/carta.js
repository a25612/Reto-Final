function addToCart(button) {
    var counterContainer = button.parentNode;
    var counterElement = counterContainer.querySelector('.counter');
    var currentCount = parseInt(counterElement.innerText) || 0; // Si es nulo, establece el valor predeterminado a 0
    var newCount = currentCount + 1;

    // Actualiza el contador
    counterElement.innerText = newCount;

    // Muestra u oculta el contador según sea necesario
    if (newCount > 0) {
        counterElement.style.display = 'inline-block';
    } else {
        counterElement.style.display = 'none';
    }

    var minusButton = counterContainer.querySelector('.minus-button');
    if (!minusButton) {
        minusButton = document.createElement('button');
        minusButton.classList.add('minus-button');
        minusButton.innerText = '-';
        minusButton.onclick = function () {
            var currentCount = parseInt(counterElement.innerText);
            if (currentCount > 0) {
                var newCount = currentCount - 1;
                counterElement.innerText = newCount;

                // Muestra u oculta el contador según sea necesario
                if (newCount > 0) {
                    counterElement.style.display = 'inline-block';
                } else {
                    counterElement.style.display = 'none';
                    minusButton.style.display = 'none'; // Oculta el botón de resta cuando el contador es cero
                }
            }
        };
        counterContainer.appendChild(minusButton);
    }
}