import { formaterDonnee } from "./utils"

async function getData() {
    try {
        const response = await fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/jardins-partages/records?limit=20")
        console.log(response)

        const data = await response.json()
        console.log(data)
        const gardenCard = formaterDonnee(data)

    } catch (error) {
        console.error(error.message)
    }
}
getData()


function displayCards(gardenArray) {
    const container = document.querySelector('.card-section');
    container.innerHTML = ""; // On vide pour la boucle

    gardenArray.forEach((garden) => {
        // 1. On crée la grosse boîte de la carte
        const card = document.createElement('div');
        card.classList.add('garden-card');

        // 2. On crée le moteur rotatif (card-inner)
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        // 3. On crée le RECTO (card-front) et son contenu
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontArticle = document.createElement('article');
        frontArticle.classList.add('card-content');

        const titleFront = document.createElement('h2');
        titleFront.classList.add('garden-name');
        titleFront.textContent = garden.gardenName;

        const infoOrg = document.createElement('p');
        infoOrg.classList.add('card-info');
        infoOrg.textContent = garden.orgName;

        const infoAddress = document.createElement('p');
        infoAddress.classList.add('card-info');
        infoAddress.textContent = garden.adress;

        const infoZip = document.createElement('p');
        infoZip.classList.add('card-info');
        infoZip.textContent = `Paris ${garden.arrondissement}`;

        // On emboîte le RECTO
        frontArticle.appendChild(titleFront);
        frontArticle.appendChild(infoOrg);
        frontArticle.appendChild(infoAddress);
        frontArticle.appendChild(infoZip);
        cardFront.appendChild(frontArticle);

        // 4. On crée le VERSO (card-back) et son contenu
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backArticle = document.createElement('article');
        backArticle.classList.add('card-content');

        const titleBack = document.createElement('h2');
        titleBack.classList.add('garden-name');
        titleBack.textContent = garden.gardenName;

        const infoEmail = document.createElement('p');
        infoEmail.classList.add('card-info');
        infoEmail.textContent = garden.email;

        const infoWeb = document.createElement('p');
        infoWeb.classList.add('card-info');
        infoWeb.textContent = garden.internet  ;

        // On emboîte le VERSO
        backArticle.appendChild(titleBack);
        backArticle.appendChild(infoEmail);
        backArticle.appendChild(infoWeb);
        cardBack.appendChild(backArticle);

        // 5. On assemble le tout dans le moteur rotatif
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        // 6. On pose la carte finale dans la page
        container.appendChild(card);
    });
}