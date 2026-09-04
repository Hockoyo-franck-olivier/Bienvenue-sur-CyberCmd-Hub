fetch('commandes.json')
    .then(reponse => reponse.json())
    .then(commandes => {
        const grille = document.getElementById('grille');

        commandes.forEach(commande => {
            grille.innerHTML += `
                <div class="carte-commande">
                    <div class="entete-carte">
                        <span class="badge-categorie">${commande.categorie}</span>
                        <span class="badge-risque">${commande.risque}</span>
                    </div>
                    <p class="nom-commande">${commande.nom}</p>
                    <p class="description-commande">${commande.description}</p>
                </div>
            `;
        });
    })
    .catch(erreur => console.error('Erreur de chargement des commandes :', erreur));