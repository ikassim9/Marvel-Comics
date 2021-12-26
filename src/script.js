const searchInput = document.getElementById('searchText');
const ts = new Date().getTime();
const str = ts + CONSTANT.privateKey + CONSTANT.apiKey;
const hash = CryptoJS.MD5(str).toString();
const base_url = new URL('http://gateway.marvel.com/v1/public');
const searchBtn = document.getElementById('searchBtn');
const cardGrid = document.getElementById('heroGrid');
const currentYear = new Date().getFullYear();



// event for when search button is clicked

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
   
    createHeroCard();
});




/** Take the hero the user searched for and send a get request for that particular hero */

async function getComicsFromHero() {

const hero = await getHero();
console.log(hero);
console.log("comics", hero.comics );
const comics = hero.comics.items;
comics.forEach(comic => {
    
 console.log("Comic: " ,comic);
 
});
}

 

 
async function getHero() {

    let request = base_url + `/characters?name=${searchInput.value}&ts=${ts}&apikey=${CONSTANT.apiKey}&hash=${hash}`

    const body = await fetch(request);
    const response = await body.json();
    const hero = response.data.results[0];
    console.log(hero);
    return hero;

}

// this functions takes the hero data and creates a grid card
async function createHeroCard(){
    const hero = await getHero();
    
    // hero card which holds the entire hero
    let heroCard = document.createElement('div');
    heroCard.classList.add('hero-card');
    heroCard.classList.add('header');

    // create hero header (this contains the hero name)

    let heroHeader = document.createElement('div');
    let heroName = document.createElement('span');
    heroName.classList.add('hero-name');
    heroHeader.classList.add('card-header', 'card-image');
    heroHeader.appendChild(heroName);



// create hero detail this will contain hero descrption

    let heroDetail = document.createElement('div')
    heroDetail.classList.add('card-detail');
    let heroDescription = document.createElement('p');
    heroDescription.classList.add('hero-description');

    // create two spans for the hero

    heroDetail.appendChild(heroDescription);



    // create hero footer (this contains the marvel attribution)

    let heroFooter = document.createElement('div');
    heroFooter.classList.add('card-footer');
    let heroAttribution = document.createElement('p');
    heroAttribution.classList.add('hero-attribution');
    heroFooter.appendChild(heroAttribution);





// add data to the hero card, add the hero name, description and attribution

    heroName.innerHTML = hero.name;
    heroDescription.innerHTML = hero.description;
    heroAttribution.innerHTML = getAttributionText();




    // add the hero header, detail and footer to the hero card
    heroCard.appendChild(heroHeader);
    heroCard.appendChild(heroDetail);
    heroCard.appendChild(heroFooter);



    // create hero image container

    let heroImageContainer = document.createElement('div');
    heroImageContainer.classList.add('hero-img');
    let imgBody = document.createElement('div');
    imgBody.classList.add('img-body');
    let img = document.createElement('img');
    img.src = hero.thumbnail.path + '.' + hero.thumbnail.extension;
    imgBody.appendChild(img);
    heroImageContainer.appendChild(imgBody);





    // add the hero card to the grid
    heroGrid.appendChild(heroCard);
    heroGrid.appendChild(heroImageContainer);


}

// function that just returns a genrated attibution text for marvel api

function getAttributionText() {
    const attributionText = `Data provided by Marvel. © ${currentYear} Marvel`;
    return attributionText;
}