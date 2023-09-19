/////creation formulaire intégré à la page de connexion
const boutonLogin = document.querySelector(".login");
const loginForm = document.getElementById("login-form");

// Écoute de l'événement de soumission du formulaire
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); ///enpecher le rechargement de la page par défaut

  // Récupération des valeurs du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Sending form input values
  const loginData = {
    email: email.trim(),
    password: password.trim(),
  };

  // Convert the data into JSON
  const formJSON = JSON.stringify(loginData);

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: formJSON,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

if (response.ok) {

  // Rediriger l'utilisateur vers la page souhaitée
  window.location.href = "index.html";
  
} else {
    // Afficher le message d'erreur en cas d'identifiants incorrects
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.visibility = "visible";
  }
});

////ajouter un ecoute au clique sur le lien login
boutonLogin.addEventListener("click", (e) => {
  ///enpecher le rechargement de la page par défaut
  e.preventDefault();
});

