// // Récupérer le token depuis le sessionStorage
const token = sessionStorage.getItem("token");
const btnModify = document.getElementById("btn-modify");
const windowModale = document.querySelector(".window-modale");
const overlay = document.querySelector("#overlay");
const modaleGaleryDiv = document.querySelector(".gallery-modale");
const containerBtn = document.querySelector(".container-btn");
const banner = document.querySelector(".banner");

// Vérifier si le token existe (si l'utilisateur est authentifié)
if (token) {
  // Afficher l'élément "modifier"
  btnModify.style.visibility = "visible"; // Afficher l'élément

  // Masquer l'élément "container-btn"
  containerBtn.style.visibility = "hidden"; // Masquer l'élément

  //afficher l'élément "banner"
  banner.style.display = "block";
}

function generateProjectsHTML(data) {
  let projectsHTML = "";
  data.forEach((work) => {
    projectsHTML += `
      <div class="projet-modale">
      <div class="container-trash">
       <a class="btn-trash" href="#" data-id="${work.id}"><i class="fa-solid fa-trash-can"></i></a>
        </div>
        <img src="${work.imageUrl}" alt="${work.title}">
      </div>
    `;
  });
  return projectsHTML;
}

// Fonction pour afficher les projets dans la fenêtre modale
function displayProjectsInModal() {
  const projectsHTML = generateProjectsHTML(originalData);
  modaleGaleryDiv.innerHTML = projectsHTML;
}

///afficher la fenetre modale au click sur bouton modifier
btnModify.addEventListener("click", () => {
  windowModale.style.display = "inline-block";
});

// Fonction pour afficher la fenêtre modale et l'overlay
function showWindowModale() {
  windowModale.style.display = "block";
  overlay.style.display = "block";
}

// Fonction pour masquer la fenêtre modale et l'overlay
function hideWindowModale() {
  windowModale.style.display = "none";
  overlay.style.display = "none";
}

// Ajoutez un écouteur de clic au bouton pour afficher la fenêtre modale et l'overlay
btnModify.addEventListener("click", () => {
  showWindowModale();
});

// Ajoutez un écouteur de clic à l'overlay pour masquer la fenêtre modale et l'overlay
overlay.addEventListener("click", () => {
  hideWindowModale();
});

////////////// supression des projets via une requeT API avec methode DELET

/////supression des donne via l'API par ID
function deleteProjectById(projectId) {
  const apiUrl = `http://localhost:5678/api/works/${projectId}`;

  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("	Non autorisé", response);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête.", error);

    });
}



const addProjects = document.querySelector(".add-projets")
const Modale = document.querySelector(".Modale")
const boutonAddPhoto = document.querySelector(".btn-add-picture");
/////masquer modale pour afficher page ajout photo
boutonAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("vous avez cliquer sur ajouter une photo");
  Modale.style.display = "none";
  addProjects.style.display = "block";
});

/////retourner a la fenetre supressiond de projet
const arrowReturne = document.querySelector(".fa-arrow-left")
arrowReturne.addEventListener("click", () => {
  Modale.style.display = "block";
  addProjects.style.display = "none";
});

////au clique sur le button ajout photo ouvrire input type:file
const uploadButton = document.getElementById("upload-button");
const imageUpload = document.getElementById("image-upload");
const containerPhoto = document.querySelector(".container-photo");



uploadButton.addEventListener("click", () => {
  imageUpload.click(); 
});

// Gérer le changement de fichier sélectionné
imageUpload.addEventListener("change", () => {
  const file = imageUpload.files[0]; // Récupérer le fichier sélectionné par l'utilisateur
  if (file) {
    const imgElement = new Image();
    imgElement.src = URL.createObjectURL(file);
    imgElement.alt = "Image sélectionnée";

    // Effacez tout le contenu existant de la div "container-photo"
    containerPhoto.innerHTML = "";

    // Ajoutez l'élément image à la div "container-photo"
    containerPhoto.appendChild(imgElement);
  } else {
    // Effacez tout le contenu de la div "container-photo" si aucun fichier n'est sélectionné
    containerPhoto.innerHTML = "";
  }
});

const categorySelect = document.getElementById("category-select");

// Effectuer une requête GET vers l'API
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    // Créer un tableau pour stocker les noms de catégories uniques
    const uniqueCategories = {};

    // Parcourir les données de l'API
    data.forEach((item) => {
      const categoryName = item.category.name;
      uniqueCategories[categoryName] = true;
    });

    // Ajouter les options à l'élément select
    for (const categoryName in uniqueCategories) {
      if (uniqueCategories.hasOwnProperty(categoryName)) {
        const option = document.createElement("option");
        option.value = categoryName;
        option.textContent = categoryName;
        categorySelect.appendChild(option);
      }
    }
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des données depuis l'API : ",
      error
    );
  });