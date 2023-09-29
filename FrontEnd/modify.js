// // Récupérer le token depuis le sessionStorage
const token = sessionStorage.getItem("token");
const btnModify = document.getElementById("btn-modify");
const windowModale = document.querySelector(".window-modale");
const overlay = document.querySelector("#overlay");
const modaleGaleryDiv = document.querySelector(".gallery-modale");
const containerBtn = document.querySelector(".container-btn");
const banner = document.querySelector(".banner")
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
// console.log("creation btn-trash");
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
      console.log("	Non autorisé",response);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête.", error);
    });
  
}



