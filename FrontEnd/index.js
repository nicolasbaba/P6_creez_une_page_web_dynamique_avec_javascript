
const apiURL = "http://localhost:5678/api/works";
const galleryDiv = document.querySelector(".gallery");
let originalData = [];

// recupération des donnees via l'API
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

function fetchProjects() {
  fetch(apiURL, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `La requête a échoué avec le statut ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      originalData = data;
      displayProjects(data);
      displayProjectsInModal();
      createButtons();
    });
}

// Integration dynamique des projets dans la page
function displayProjects(data) {
  let projectsHTML = "";
  data.forEach((work) => {
    projectsHTML += `
      <div class="projet">
        <img src="${work.imageUrl}" alt="${work.title}">
        <p>${work.title}</p>
      </div>
    `;
  });
  galleryDiv.innerHTML = projectsHTML;

}

// Fonction pour filtrer les projets par categoryId
function filterProjectsByCategory(categoryId) {
  if (categoryId === null) {
    // Si CategoryId est nul, affichez tous les projets
    displayProjects(originalData);
  } else {
    // Sinon, filtrez les projets selon le CategoryId spécifié.
    const filteredData = originalData.filter(
      (work) => work.categoryId === categoryId
    );
    displayProjects(filteredData);
  }
}

// Function pour créer et ajouter des boutons dynamiquement
function createButtons() {
  const buttonContainer = document.querySelector(".container-btn");

  const buttonInfo = [
    { label: "Tous", categoryId: null },
    { label: "Objet", categoryId: 1 },
    { label: "Apartements", categoryId: 2 },
    { label: "Hotel/Restaurant", categoryId: 3 },
  ];

  buttonInfo.forEach((info) => {
    const button = document.createElement("button");
    button.textContent = info.label;
    button.classList.add("btn");
    if (info.categoryId === null) {
      button.classList.add("btn-default");
    }
    button.addEventListener("click", () => {
      filterProjectsByCategory(info.categoryId);
      //Supprimez la classe "btn-default" de tous les boutons
      document.querySelectorAll(".btn").forEach((btn) => {
        btn.classList.remove("btn-default");
      });
      // Ajoutez la classe "btn-default" au bouton cliqué
      button.classList.add("btn-default");
    });
    buttonContainer.appendChild(button);
  });

  /////////ecoute tout les btn de supression de projet "btn-trash" avec double validation avant supression du projet 
  const trashLinks = document.querySelectorAll(".btn-trash");
  trashLinks.forEach((trashLink) => {
    trashLink.addEventListener("click", (e) => {
      e.preventDefault();
      const projectIdToDelete = trashLink.getAttribute("data-id");
      console.log(projectIdToDelete);
      // Double validation avant la supression du projet
      function confirmDelete() {
        const confirmation = window.confirm(
          "Voulez-vous vraiment supprimer ce projet ?"
        );
        if (confirmation) {
          deleteProjectById(projectIdToDelete);
        }
      }
      confirmDelete();
    });
  });
}

// Appel initial pour récupérer tous les projets et créer les boutons
fetchProjects();
