document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const username = formData.get("username");
      const password = formData.get("password");
  
      fetch("http://localhost:8080/Xeneburguer/Controller?ACTION=CLIENTES.LOGIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          username: username,
          password: password
        })
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes("Login exitoso")) {
          window.location.href = "/html/order.html"; 
        } else {
          errorMessage.textContent = "Invalid username or password.";
          errorMessage.style.display = "block";
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
        errorMessage.style.display = "block";
      });
    });
  });
  