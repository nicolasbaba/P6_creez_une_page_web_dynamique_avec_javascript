const apiURL = "http://localhost:5678/api/works";
const galleryDiv = document.querySelector(".gallery");
let originalData = [];

// console.log(apiURL);

///recuperation des donne via l'API
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
    })
    .then(() => {
      // Sélectionnez tous les éléments avec la classe "btn-trash"
      const trashLinks = document.querySelectorAll(".btn-trash");
      trashLinks.forEach((trashLink) => {
        trashLink.addEventListener("click", (e) => {
          // Empêcher le lien de rediriger vers une autre page
          e.preventDefault();
          const projectIdToDelete = trashLink.getAttribute("data-id");
          console.log(projectIdToDelete);
          /// double validation avant supression
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
    });
}

/////intégré dinamiquement les projet a la page
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
////function filterProjectsByCategory egale a categoryId
function filterProjectsByCategory(categoryId) {
  const filteredData = originalData.filter(
    (work) => work.categoryId === categoryId
  );
  displayProjects(filteredData);
}

////trier les projet
const boutonTous = document.querySelector(".btn-1");
const boutonObjet = document.querySelector(".btn-2");
const boutonApartements = document.querySelector(".btn-3");
const boutonHotelRestaurant = document.querySelector(".btn-4");
////au clique sur boutonTous afficher touts les projet
boutonTous.addEventListener("click", () => {
  displayProjects(originalData);
});
///// au clique sure boutonObjet afficher tout les objet
boutonObjet.addEventListener("click", () => {
  filterProjectsByCategory(1);
});
//// au clique boutonApartements afficher tout les apartement
boutonApartements.addEventListener("click", () => {
  filterProjectsByCategory(2);
});
//// au clique sur boutonHotelRestaurant afficher tous les hotel/restaurant
boutonHotelRestaurant.addEventListener("click", () => {
  filterProjectsByCategory(3);
});

////// Appel initial pour récupérer tous les projets
fetchProjects();


///// ajouter dynamiquement la class btn-defaut au clique sur les btn 
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Supprime la classe "btn-default" de tous les boutons
      buttons.forEach((btn) => {
        btn.classList.remove("btn-default");
      });

      // Ajoute la classe "btn-default" au bouton actuellement cliqué
      this.classList.add("btn-default");
    });
  });
});

