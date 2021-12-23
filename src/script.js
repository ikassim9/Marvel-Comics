const searchInput = document.getElementById('searchText');
const ts = new Date().getTime();
const str = ts + CONSTANT.privateKey + CONSTANT.apiKey;
const hash = CryptoJS.MD5(str).toString();
const base_url = new URL('http://gateway.marvel.com/v1/public');


/** Take the hero the user searched for and send a get request for that particular hero */

function searchForHero() {


    let request = base_url + `/characters?name=${searchInput.value}&ts=${ts}&apikey=${CONSTANT.apiKey}&hash=${hash}`

    console.log("request: ", request)
    fetch(request)
        .then(body => body.json())
        .then(response => console.log("Response: ", response))

        .catch(err => console.error("Error:", err));


}
 