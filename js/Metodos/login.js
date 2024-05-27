document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorMessage = document.getElementById('error-message');

      try {
          const response = await fetch('http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.LOGIN', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ NAME: username, CONTRASENA: password })
          });

          if (response.ok) {
              const result = await response.json();
              if (result.success) {
                  window.location.href = 'order.html';
              } else {
                  throw new Error('Invalid email or password');
              }
          } else {
              throw new Error('Failed to log in');
          }
      } catch (error) {
          errorMessage.textContent = error.message;
          errorMessage.style.display = 'block';
      }
  });
});
