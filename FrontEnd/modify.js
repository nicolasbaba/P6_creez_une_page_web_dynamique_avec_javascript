const token = sessionStorage.getItem("token");
const btnModify = document.getElementById("btn-modify");
const windowModale = document.querySelector(".window-modale");
const overlay = document.querySelector("#overlay");
const modaleGaleryDiv = document.querySelector(".gallery-modale");
const containerBtn = document.querySelector(".container-btn");
const banner = document.querySelector(".banner");
const closeModale = document.querySelector(".fa-xmark");
const closeModaleAddProjets = document.querySelector(".add-projets .fa-xmark");
const closeModaleWindow = document.querySelector(".window-modale .fa-xmark");
const addProjects = document.querySelector(".add-projets");
const Modale = document.querySelector(".Modale");
const boutonAddPhoto = document.querySelector(".btn-add-picture");
const uploadButton = document.getElementById("upload-button");
const imageUpload = document.getElementById("image-upload");
const containerPhoto = document.querySelector(".container-photo");
const categorySelect = document.getElementById("category-select");
const titleInput = document.querySelector('input[name="text"]');
const validationButton = document.querySelector(".btn-validation");
const containerPhoto2 = document.querySelector(".container-photo-2");
const bntLogin = document.querySelector(".login")
const btnLogout = document.querySelector(".logout")

// Vérifier si le token existe si l'utilisateur est authentifié
if (token) {
  // Afficher l'élément "modifier"
  btnModify.style.visibility = "visible";

  // Masquer l'élément "container-btn"
  containerBtn.style.visibility = "hidden";

  //afficher l'élément "banner"
  banner.style.display = "block";
 // masquer btn login
  bntLogin.style.display = "none"
//afficher btn logout
  btnLogout.style.display = "block"
}

//// ce deconnecter du mode edition en cliquant sur logout 
btnLogout.addEventListener("click", () => {
  // Masquer l'élément "modifier"
  btnModify.style.visibility = "hidden";
  // Afficher l'élément "container-btn"
  containerBtn.style.visibility = "visible";
  //masquer l'eélément banner
  banner.style.display = "none";
  //afficher btn login
  bntLogin.style.display = "block";
  //masquer logout
  btnLogout.style.display = "none";
  // Supprimer le token d'authentification du sessionStorage
  sessionStorage.removeItem("token");
})


/////genere le code html avec les projet et les btn de supression
function generateProjectsHTML(data) {
  let projectsHTML = "";
  data.forEach((work) => {
    projectsHTML += `
      <div class="projet-modale" >
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
  //// au clique sur vtn-modify toujour afficher galerie photo
  Modale.style.display = "block";
  addProjects.style.display = "none";

  showWindowModale();
});

// Fonction pour afficher la fenêtre modale et l'overlay
function showWindowModale() {
  windowModale.style.display = "block";
  overlay.style.display = "block";
}

// Fonction pour masquer la fenêtre modale et l'overlay
function hideWindowModale() {
  /////masquer la fentre modale et l'overlay
  windowModale.style.display = "none";
  overlay.style.display = "none";
  // validationButton.classList.remove("btn-validation-active");
   closeButtonPictures.style.display = "none";
   // la div container-photo-2
   containerPhoto2.style.display = "none";
   // Cacher la div container-photo
   containerPhoto.style.display = "block";
   // Réinitialiser la valeur de imageUpload
   imageUpload.value = "";
   // Mettre à jour le style du bouton de validation
  resetImageUpload();
}


// Ajoutez un écouteur de clic à l'overlay pour masquer la fenêtre modale et l'overlay
overlay.addEventListener("click", () => {
  hideWindowModale();
});

// ajoutez ecouteur de clique  "fa-xmark" icon dans add-projets
closeModaleAddProjets.addEventListener("click", () => {
  hideWindowModale();
});

//  ajoutez ecouteur de clique "fa-xmark" icon dans window-modale
closeModaleWindow.addEventListener("click", () => {
  hideWindowModale();
});

////////////// supression des projets via une requeT API avec methode DELET

////supression des donne via l'API par ID
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
      if (response.status === 204) {
        console.log("Projet supprimé avec succès");
        fetchProjects();
      } else if (response.status === 401) {
        console.log("Non autorisé");
      } else if (response.status === 500) {
        console.log("Erreur interne du serveur");
      } else {
        console.log("Statut de réponse inattendu :", response.status);
      }
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête.", error);
    });
}

////////////////// afficher ou fermer la modal

/////masquer modale pour afficher page ajout photo
boutonAddPhoto.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("vous avez cliquer sur ajouter une photo");
  Modale.style.display = "none";
  addProjects.style.display = "block";
});

/////retourner a la modale supression de projet au cliquer sur la fleche "fa-arrow-left"
const arrowReturne = document.querySelector(".fa-arrow-left");
arrowReturne.addEventListener("click", (e) => {
  e.preventDefault();
  Modale.style.display = "block";
  addProjects.style.display = "none";
});

const closeButtonPictures = document.querySelector(".container-photo-2");

function resetImageUpload() {
  if(imageUpload){
    imageUpload.value = "";
    // Réinitialise la valeur du champ de téléchargement
    updateValidationButtonStyle(); // Met à jour le style du bouton de validation
  }
}

function setupUploadButton() {
  const uploadButton = document.getElementById("upload-button");
  const imageUpload = document.getElementById("image-upload");
  const containerPhoto = document.querySelector(".container-photo"); 
  const closeButtonPictures = document.querySelector(".close-pictures"); 

  uploadButton.addEventListener("click", () => {
    imageUpload.click();
    resetImageUpload();
  });

  imageUpload.addEventListener("change", function () {
    if (imageUpload.files && imageUpload.files[0]) {
      // Cacher la div container-photo
      containerPhoto.style.display = "none";
      // Afficher la div container-photo-2
      containerPhoto2.style.display = "block";
      // resetImageUpload();
      const oldImage = containerPhoto2.querySelector("img");
      if (oldImage) {
        containerPhoto2.removeChild(oldImage);
      }

      // Créer un élément image pour afficher la photo sélectionnée
      const imgElement = new Image();
      imgElement.src = URL.createObjectURL(imageUpload.files[0]); // Utilisez imageUpload.files[0] pour obtenir le fichier
      imgElement.alt = "Image sélectionnée";
      // Ajouter l'image à container-photo-2
      containerPhoto2.appendChild(imgElement);
      // Afficher le bouton "close-picture"
      closeButtonPictures.style.display = "block";

      closeButtonPictures.addEventListener("click", () => {
        resetImageUpload();
        // Cacher le bouton de fermeture de la photo
        closeButtonPictures.style.display = "none";
        // la div container-photo-2
        containerPhoto2.style.display = "none";
        // Cacher la div container-photo
        containerPhoto.style.display = "block";
        //// Réinitialiser la valeur de imageUpload Mettre à jour le style du bouton de validation
      });
    }
  });
}
 
// Appelez la fonction setupUploadButton pour configurer les gestionnaires d'événements
setupUploadButton();


// Effectuer une requête GET vers l'API pour integre dynamiquement les choix des categorie
fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    // Créer un tableau pour stocker les catégories uniques (avec ID et nom)
    const uniqueCategories = [];
    // console.log(uniqueCategories);
    // Parcourir les données de l'API
    data.forEach((item) => {
      if (item.category && item.category.id && item.category.name) {
        const category = {
          id: item.category.id,
          name: item.category.name,
        };
        // Vérifier si la catégorie existe déjà dans le tableau
        if (
          !uniqueCategories.some(
            (existingCategory) => existingCategory.id === category.id
          )
        ) {
          uniqueCategories.push(category);
        }
      }
    });

    // Ajouter les options à l'élément select
    uniqueCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la récupération des données depuis l'API : ",
      error
    );
  });

// Écoutez les changements dans les champs du formulaire
// imageUpload.addEventListener("change", updateValidationButtonStyle);
imageUpload.addEventListener("change", () => {
  console.log("Changement de l'image détecté.");
  updateValidationButtonStyle(); 
  // Assurez-vous que le code de mise à jour du bouton "Valider" est correct ici.
});
titleInput.addEventListener("input", updateValidationButtonStyle);
categorySelect.addEventListener("change", updateValidationButtonStyle);

// Fonction pour mettre à jour le style du bouton de validation
function updateValidationButtonStyle() {
  console.log("update")
  if (
    imageUpload.files.length > 0 &&
    titleInput.value.trim() !== "" &&
    categorySelect.value !== "null"
  ) {
    validationButton.classList.add("btn-validation-active");
  } else {
    validationButton.classList.remove("btn-validation-active");
  }
}


validationButton.addEventListener("click", async function (e) {
  e.preventDefault();

  // updateValidationButtonStyle();
  
  if (validationButton.classList.contains("btn-validation-active")) {
    const form = new FormData(); // Créez un objet FormData pour envoyer les données

    // Récupérez le fichier sélectionné depuis le champ de téléchargement d'image
    const imageFile = imageUpload.files[0]; // Utilisez la photo actuellement sélectionnée
    console.log(imageFile);
    // Ajoutez les valeurs des champs du formulaire à FormData
    form.append("image", imageFile);
    form.append("title", titleInput.value);
    form.append("category", categorySelect.value);

    const token = sessionStorage.getItem("token");

    // Envoie les données à l'API via une requête POST
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        // Requête réussie
        console.log("Œuvre créée avec succès");
        fetchProjects();
      } else if (response.status === 400) {
        // Mauvaise demande
        console.error("Mauvaise demande");
      } else if (response.status === 401) {
        // Non autorisé
        console.error("Non autorisé");
      } else {
        console.error("Statut de réponse inattendu :", response.status);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la requête.", error);
    }
  }
});
