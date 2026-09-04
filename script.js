let toutesLesCommandes = [];

function afficherCommandes(liste) {
    const grille = document.getElementById('grille');
    grille.innerHTML = '';

    liste.forEach(commande => {
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
}

fetch('commandes.json')
    .then(reponse => reponse.json())
    .then(commandes => {
        toutesLesCommandes = commandes;
        afficherCommandes(toutesLesCommandes);
    })
    .catch(erreur => console.error('Erreur de chargement des commandes :', erreur));

    
    
    document.getElementById('recherche').addEventListener('input', (evenement) => {
    const texteRecherche = evenement.target.value.toLowerCase();

    const resultats = toutesLesCommandes.filter(commande =>
        commande.nom.toLowerCase().includes(texteRecherche) ||
        commande.description.toLowerCase().includes(texteRecherche)
    );

    afficherCommandes(resultats);
});