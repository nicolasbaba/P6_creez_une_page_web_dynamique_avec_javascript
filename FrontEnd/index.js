const apiURL = "http://localhost:5678/api/works";

// Options de la requête
const requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// Sélectionnez la div avec la classe "gallery" où vous voulez afficher les projets
const galleryDiv = document.querySelector(".gallery");

// appel à l'API avec fetch
fetch(apiURL, requestOptions)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`La requête a échoué avec le statut ${response.status}`);
    }
    return response.json();
  })
    
    
  .then((data) => {
    // Créez du contenu HTML pour chaque projet
    const projectsHTML = data
      .map(
        (work) => `
      <div class="project">
        <img src="${work.imageUrl}" alt="${work.title}">
        <p>Catégorie : ${work.name}</p>
      </div>
    `
      )
      .join("");

    // Ajoutez le contenu HTML à la div avec la classe "gallery"
    galleryDiv.innerHTML = projectsHTML;
  })
    
    
  .catch((error) => {
      console.error("Une erreur s'est produite :", error);
  
  });
