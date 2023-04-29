require("dotenv").config();
const fetch = require("cross-fetch");
const express = require("express");
 
var CryptoJS = require("crypto-js");

const app = express();
const ts = new Date().getTime();
const str = ts + process.env.privateKey + process.env.apiKey;
const hash = CryptoJS.MD5(str).toString().toLowerCase();
const base_url = new URL("http://gateway.marvel.com/v1/public");
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

app.use(express.static("public/src"));

 

app.get("/:heroName", async (req, res) => {
    const heroName = req.params.heroName;
    const hero = await getHero(heroName);
    // if the hero is not found, then send 404 status code
    if (hero.data.count < 1) {
        res.status(404).send("Character not found");
    } else {
        const heroID = hero.data.results[0].id;

        const comics = await getComics(heroID);
        res.json({
            hero: hero,
            comics: comics,
        });
    }
});

app.listen(port, host, function () {
    console.log(`Express server listening at http://localhost:${port}`);
});
// send a get request to marvel api to retreive the given character
async function getHero(heroName) {
    const request = base_url + `/characters?name=${heroName}&ts=${ts}&apikey=${process.env.apiKey}&hash=${hash}`;
    const body = await fetch(request);
    const response = await body.json();
    return response;
}

// use character ID to retrieve the comics for the given character

async function getComics(heroID) {
    const request = base_url + `/characters/${heroID}/comics?ts=${ts}&apikey=${process.env.apiKey}&hash=${hash}`;
    let body = await fetch(request);
    let response = await body.json();
    return response;
}
/**
 * Checks if environment is production and if it is, then enforce https
 */

function enforceHttps() {
    if (app.get("env") === "production") {
        console.log("enforcing https");
        app.use(
            enforce.HTTPS({
                trustProtoHeader: true,
            })
        );
    }
}