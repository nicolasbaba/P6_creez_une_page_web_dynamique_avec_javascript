const apiURL = "http://localhost:5678/api/works";
const galleryDiv = document.querySelector(".gallery");
let originalData = [];
// console.log(originalData);

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

function filterProjectsByCategory(categoryId) {
  const filteredData = originalData.filter(
    (work) => work.categoryId === categoryId
  );
  displayProjects(filteredData);
}

const boutonTous = document.querySelector(".btn-1");
const boutonObjet = document.querySelector(".btn-2");
const boutonApartements = document.querySelector(".btn-3");
const boutonHotelRestaurant = document.querySelector(".btn-4");
const boutonLogin = document.querySelector(".login");

boutonTous.addEventListener("click", () => {
  displayProjects(originalData);
});

boutonObjet.addEventListener("click", () => {
  filterProjectsByCategory(1);
});

boutonApartements.addEventListener("click", () => {
  filterProjectsByCategory(2);
});

boutonHotelRestaurant.addEventListener("click", () => {
  filterProjectsByCategory(3);
});


boutonLogin.addEventListener("click", () => {
  console.log("vous avez apuyer sur login");
});

// Appel initial pour récupérer tous les projets
fetchProjects();



