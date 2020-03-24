class SalleCinema {
    constructor(_nomFilm, _nbPlace, _prix) {
        this.nbPlaceTarifNormal = 0;
        this.nbPlaceTarifReduit = 0;
        this.nomFilm = _nomFilm;
        this.nbPlace = _nbPlace;
        this.prix = _prix;
    }
    /***************** CREATION DES GETTER ET SETTER ******************/
    set NomFilm(_nomFilm) {
        this.nomFilm = _nomFilm;
    }
    get NomFilm() {
        return this.nomFilm;
    }
    set NbPlace(_nbPlace) {
        this.nbPlace = _nbPlace;
    }
    get NbPlace() {
        return this.nbPlace;
    }
    set Prix(_prix) {
        this.prix = _prix;
    }
    get Prix() {
        return this.prix;
    }
    /*********************** METHODES **************************/
    nbPlacesDisponibles() {
        let nbPlaceDispo = this.nbPlace - (this.nbPlaceTarifNormal + this.nbPlaceTarifReduit);
        return nbPlaceDispo;
    }
    vendrePlaces(nbre, tarifReduit) {
        let prix;
        if (this.nbPlacesDisponibles() > nbre) {
            if (tarifReduit == false) {
                this.nbPlaceTarifNormal += nbre;
                prix = nbre * this.prix;
            }
            else {
                this.nbPlaceTarifReduit += nbre;
                prix = nbre * this.prix * 0.8;
            }
            alert("Réservation effectué pour la somme de " + prix + "€");
        }
        else {
            prix = 0;
            alert("Il reste actuellement " + this.nbPlacesDisponibles() + " place(s).");
        }
        return prix;
    }
    remiseAZero() {
        this.nbPlaceTarifNormal = 0;
        this.nbPlaceTarifReduit = 0;
    }
    chiffreAffaires() {
        return (this.nbPlaceTarifNormal * this.prix + this.nbPlaceTarifReduit * this.prix * 0.8);
    }
    tauxRemplissage() {
        let taux = (this.nbPlaceTarifNormal + this.nbPlaceTarifReduit) / this.nbPlace * 100;
        return taux;
    }
    afficheSynthese() {
        let synthese = "Film joué : " + this.nomFilm + ", Nombre de places : " + this.nbPlace +
            ", Prix d'une place : " + this.prix + " €, " + this.nbPlaceTarifNormal +
            " places vendues au tarif normal , " + this.nbPlaceTarifReduit +
            " places vendues au tarif réduit.";
        return synthese;
    }
}
/***************** DECLARATION DES OBJETS & VARIABLES ********************/
let salle1 = new SalleCinema("Le film un peu bien mais pas beaucoup trop !", 80, 6.99);
let salle2 = new SalleCinema("Le film un peu moins bien mais pas beaucoup trop !", 60, 4.50);
let salle3 = new SalleCinema("Le film un peu moins bien !", 30, 3.28);
let salle4 = new SalleCinema("Le film un peu bien !", 100, 8);
let salle5 = new SalleCinema("Le film bien mais pas beaucoup trop !", 110, 10);
let salle6 = new SalleCinema("Le film bien !", 150, 15);
let seances = new Array(salle1, salle2, salle3, salle4, salle5, salle6);
let select = document.querySelector("#film");
let btn = document.querySelector("#btn");
let btnR = document.querySelector("#reset");
/******************** CREATION DES FONCTIONS ***********************/
function init() {
    /************* TABLEAU DES SEANCES **************/
    let tbody = document.createElement("tbody");
    for (let index = 0; index < seances.length; index++) {
        const element = seances[index];
        let tr = document.createElement("tr");
        let tdTitre = document.createElement("td");
        tdTitre.innerHTML = element.NomFilm;
        tr.appendChild(tdTitre);
        let tdPlace = document.createElement("td");
        tdPlace.innerHTML = element.NbPlace.toString();
        tdPlace.className = "text-center";
        tr.appendChild(tdPlace);
        let tdPrix = document.createElement("td");
        tdPrix.innerHTML = element.Prix.toString();
        tdPrix.className = "text-center";
        tr.appendChild(tdPrix);
        tbody.appendChild(tr);
    }
    document.querySelector("table").appendChild(tbody);
    /************* OPTION DU SELECT **************/
    for (let index = 0; index < seances.length; index++) {
        const element = seances[index];
        let opt = document.createElement('option');
        opt.innerHTML = element.NomFilm;
        opt.value = index.toString();
        select.appendChild(opt);
    }
}
function reservation() {
    let inputPlace = document.querySelector("#nbPlace");
    let checkbox = document.querySelector("#promo");
    let select = document.querySelector("#film");
    seances[select.value].vendrePlaces(parseInt(inputPlace.value), checkbox.checked);
    affichageDynamique();
}
function affichageDynamique() {
    let div = document.querySelector("#syntheseDiv");
    for (var i = div.childNodes.length - 1; i >= 0; --i) {
        div.removeChild(div.childNodes[i]);
    }
    for (let index = 0; index < seances.length; index++) {
        let stock = document.createElement("div");
        stock.className = "mb-3";
        let h3 = document.createElement("h3");
        h3.innerHTML = "Salle " + (index + 1);
        let p = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        p.innerHTML = seances[index].afficheSynthese();
        p2.innerHTML = "Le chiffre d'affaire généré par ce film est de " + seances[index].chiffreAffaires() + "€";
        p3.innerHTML = "Il reste " + seances[index].nbPlacesDisponibles() + " place(s)";
        p3.style.fontWeight = "bold";
        stock.appendChild(h3);
        stock.appendChild(p);
        stock.appendChild(p3);
        stock.appendChild(p2);
        div.appendChild(stock);
    }
}
function reset() {
    for (let index = 0; index < seances.length; index++) {
        seances[index].remiseAZero();
    }
    affichageDynamique();
}
/********************** GESTIONNAIRE D'EVENEMENT **************************/
window.addEventListener("load", init);
window.addEventListener("load", affichageDynamique);
btn.addEventListener("click", reservation);
btnR.addEventListener("click", reset);
