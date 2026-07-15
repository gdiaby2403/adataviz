
export const formatData = (dataResponse) => {
    let dataArray = []
    const datagarden = dataResponse.results
        datagarden.forEach((garden) => {
            let gardenInfo = {
                gardenName : garden.nom_ev ,
                orgName : garden.nom_gerant ,
                adress : garden.adresse ,
                arrondissement : garden.arrondissement,
                email : garden.mail_1 ,
                internet : garden.internet_1
            }
            dataArray.push(gardenInfo)
        });
        return dataArray
}


/* Fonction pure: n'a pas besoin des variables contenues dans main.js, juste besoin des variables internes à la fonction 
facilement testable et réutilisable dans n'importe quel projet */
