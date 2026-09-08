let toutesLesCommandes = [];
let categorieActive = 'toutes';

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
                <button class="bouton-copier">Copier</button>
            </div>
        `;
    });
}

function appliquerFiltres() {
    const texteRecherche = document.getElementById('recherche').value.toLowerCase();

    const resultats = toutesLesCommandes.filter(commande => {
        const correspondTexte =
            commande.nom.toLowerCase().includes(texteRecherche) ||
            commande.description.toLowerCase().includes(texteRecherche);

        const correspondCategorie =
            categorieActive === 'toutes' || commande.categorie === categorieActive;

        return correspondTexte && correspondCategorie;
    });

    afficherCommandes(resultats);
}

function creerBoutonsFiltres(commandes) {
    const categories = ['toutes', ...new Set(commandes.map(commande => commande.categorie))];
    const conteneurFiltres = document.getElementById('filtres');

    categories.forEach(categorie => {
        const bouton = document.createElement('button');
        bouton.textContent = categorie === 'toutes' ? 'Toutes' : categorie;
        bouton.classList.add('bouton-filtre');
        if (categorie === categorieActive) {
            bouton.classList.add('actif');
        }

        bouton.addEventListener('click', () => {
            categorieActive = categorie;
            document.querySelectorAll('.bouton-filtre').forEach(b => b.classList.remove('actif'));
            bouton.classList.add('actif');
            appliquerFiltres();
        });

        conteneurFiltres.appendChild(bouton);
    });
}

fetch('commandes.json')
    .then(reponse => reponse.json())
    .then(commandes => {
        toutesLesCommandes = commandes;
        afficherCommandes(toutesLesCommandes);
        creerBoutonsFiltres(toutesLesCommandes);
    })
    .catch(erreur => console.error('Erreur de chargement des commandes :', erreur));

document.getElementById('recherche').addEventListener('input', appliquerFiltres);

document.getElementById('grille').addEventListener('click', (evenement) => {
    if (evenement.target.classList.contains('bouton-copier')) {
        const carte = evenement.target.closest('.carte-commande');
        const texteCommande = carte.querySelector('.nom-commande').textContent;

        navigator.clipboard.writeText(texteCommande).then(() => {
            evenement.target.textContent = 'Copié !';
            setTimeout(() => {
                evenement.target.textContent = 'Copier';
            }, 1500);
        });
    }
});