import {describe, it, expect} from 'vitest'
import { formatData} from "./utils.js";


describe("formatData", () => {
    it("retourne les données brutes correctement formatées de l'API ", () => {
        expect(formatData({
            results : [{
        "nom_ev": "Des tours au jardin",
        "adresse": "Villa d'Este",
        "nom_gerant": "Des tours au jardin",
        "domaine": "Ville de Paris",
        "proprietaire_terrain": "DEVE",
        "mail_1": "dtajbureau@googlegroups.com",
        "internet_1": "https://sites.google.com/view/destoursaujardin/",
        "arrondissement": "Paris 13e Arrondissement"
            }]
    })).toEqual([{
        gardenName: "Des tours au jardin",
        orgName: "Des tours au jardin",
        adress: "Villa d'Este",
        arrondissement: "Paris 13e Arrondissement",
        email: "dtajbureau@googlegroups.com",
        internet: "https://sites.google.com/view/destoursaujardin/",
    }])
    })
})