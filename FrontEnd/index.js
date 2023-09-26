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
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
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
