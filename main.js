import { formatData } from "./utils.js"

// stocke les 20 jardins réutilisable hors de la fonction async
let allGarden = [] 
const selectArrondissement = document.querySelector("#arrondissement-select")

async function getData() {
    try {
        const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/jardins-partages/records?limit=20")
        const data = await response.json()

        const formatedData = formatData(data)
        allGarden = formatedData

        displayCards(formatedData)

        arrFilter(formatedData)


    } catch (error) {
        console.error(error.message)
    }
}
getData()


function displayCards(gardenArray) {

      // Compteur résultat trouvé
    const counterResults = document.querySelector(".results-count")
    counterResults.textContent = `${gardenArray.length} résultats trouvés` 

    const container = document.querySelector('.card-section')
    container.innerHTML = "" // On vide pour la boucle

    gardenArray.forEach((garden) => {

        // boîte exterieure conteneur
        const card = document.createElement('div')
        card.classList.add('garden-card')

        card.addEventListener('click', () => {
            card.classList.toggle('flipped'); 
        });
        // moteur rotatif (card-inner)
        const cardInner = document.createElement('div')
        cardInner.classList.add('card-inner')

        // Recto de la carte (card-front) et son contenu (card-content)
        const cardFront = document.createElement('div')
        cardFront.classList.add('card-front')
        const frontArticle = document.createElement('article')
        frontArticle.classList.add('card-content')

        // titre de la carte : Nom jardin
        const titleFront = document.createElement('h2')
        titleFront.classList.add('garden-name')
        titleFront.textContent = garden.gardenName

        // Nom Asso
        const infoOrg = document.createElement('p')
        infoOrg.classList.add('card-info')
        infoOrg.textContent = garden.orgName

        const infoAddress = document.createElement('p')
        infoAddress.classList.add('card-info')
        infoAddress.textContent = garden.adress

        // Arrondissement
        const infoArr = document.createElement('p')
        infoArr.classList.add('card-info')
        infoArr.textContent = `${garden.arrondissement}`

        // Infos RECTO injectées dans le DOM
        frontArticle.appendChild(titleFront)
        frontArticle.appendChild(infoOrg)
        frontArticle.appendChild(infoAddress)
        frontArticle.appendChild(infoArr)
        cardFront.appendChild(frontArticle)

        // Verso de la carte (card-back) et son contenu (card-content)
        const cardBack = document.createElement('div')
        cardBack.classList.add('card-back')
        const backArticle = document.createElement('article')
        backArticle.classList.add('card-content')

        const titleBack = document.createElement('h2')
        titleBack.classList.add('garden-name')
        titleBack.textContent = garden.gardenName

        const infoEmail = document.createElement('p')
        infoEmail.classList.add('card-info')
        infoEmail.textContent = garden.email

        const infoWeb = document.createElement('p')
        infoWeb.classList.add('card-info')
        infoWeb.textContent = garden.internet  

        //  Infos VERSO injectées dans le DOM
        backArticle.appendChild(titleBack)
        backArticle.appendChild(infoEmail)
        backArticle.appendChild(infoWeb)
        cardBack.appendChild(backArticle)

        //  Assemblage des boîtes interieurs
        cardInner.appendChild(cardFront)
        cardInner.appendChild(cardBack)
        card.appendChild(cardInner)

        // conteneur principale externe
        container.appendChild(card)

    })
}

function gardenFilter() {
    const selectedValue = selectArrondissement.value;

    const filterResult = allGarden.filter(garden => {
        // Aucun filtre appliqué on affiche tous les jardins
        if (selectedValue === "") return true
        return garden.arrondissement === selectedValue
        // Affiche seulement les jardins de l'arrondissement sélectionnés
    })
    displayCards(filterResult)
}

selectArrondissement.addEventListener("change", () => {
    gardenFilter()
})

function arrFilter(formatedData) {
    const arrondissements = []
    console.log(formatedData)
    const arrSelect = document.querySelector("#arrondissement-select")

    formatedData.forEach(garden => {
        if (!arrondissements.includes(garden.arrondissement)) {
            arrondissements.push(garden.arrondissement)
        }
    })
    arrondissements.forEach((arr) => {
        const option = document.createElement("option")
        option.value = arr
        option.textContent = arr
        arrSelect.appendChild(option)
    })
}

// trier les arrondissements 
// 1. split mes arrondissements avec espace
// 2. cibler le 2eme éléments du tableau par ex : 13e, 18e, ...
// 3. nettoyer le e de 13e 
// 4. convertir en number 
// 5. sort a - b 