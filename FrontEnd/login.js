/////creation formulaire intégré à la page de connexion
const boutonLogin = document.querySelector(".login");
const loginForm = document.getElementById("login-form");

let formJSON;

// Écoute de l'événement de soumission du formulaire
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); ///enpecher le rechargement de la page par défaut

  // Récupération des valeurs du formulaire
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Envoi des valeurs d'entrée du formulaire
  const loginData = {
    email: email.trim(),
    password: password.trim(),
  };

  // Convertir data en JSON
  const formJSON = JSON.stringify(loginData);

try {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: formJSON,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Vérification de la réponse de l'API
  if (response.ok) {
    // Extraction du token de la réponse JSON
    const tokenData = await response.json();
    const token = tokenData.token;
    console.log(response.json);
    // Stocker le token dans sessionStorage
    sessionStorage.setItem("token", token);

    // Rediriger l'utilisateur vers la page souhaitée
    window.location.href = "index.html";
  } else {
    // Afficher le message d'erreur en cas d'identifiants incorrects
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.visibility = "visible";
  }
} catch (error) {
  const errorMessage2 = document.getElementById("error-message-2");
 errorMessage2.style.display = "block";
}

});

const token = sessionStorage.getItem("token");
// console.log(token);



