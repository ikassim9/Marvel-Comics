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

    createHeroCard();



});



// get the hero the user searched for

async function getHero() {

    let request = base_url + `/characters?name=${searchInput.value}&ts=${ts}&apikey=${CONSTANT.apiKey}&hash=${hash}`

    const body = await fetch(request);
    const response = await body.json();
    console.log(response);
    if (response.code === 200) {
        if (response.data.count == 1) {
            removeChildElements();

            const hero = response.data.results[0];
            console.log("hero", hero);
            return hero;
        } else {
            alert('Hero not found');
        }

    }
}

// get comics for the hero by passing in heroID

async function getComics(heroID) {

    let request = base_url + `/characters/${heroID}/comics?ts=${ts}&apikey=${CONSTANT.apiKey}&hash=${hash}`
    let body = await fetch(request);
    let response = await body.json();
    return response.data.results;

}




// this functions takes the hero data and creates a grid card
async function createHeroCard() {
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
    if (hero.description !== "") {
        heroDescription.innerHTML = hero.description;
    } else {
        heroDescription.innerHTML = "No description available for this hero";
    }
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
    cardGrid.appendChild(heroCard);
    cardGrid.appendChild(heroImageContainer);

    // create comic card and add it to the grid

    createComicCard(hero.id);


}

// function that just returns a genrated attibution text for marvel api

function getAttributionText() {
    const attributionText = `Data provided by Marvel. © ${currentYear} Marvel`;
    return attributionText;
}

async function createComicCard(heroID) {
    const comics = await getComics(heroID);
    console.log(comics);
    // loop through comics and create a comic for each comic in the array
    comics.forEach(comic => {

        //create comic container

        let comic_card = document.createElement('div');
        comic_card.classList.add('hero-card');


        // create comic image container

        let comicImageContainer = document.createElement('div');
        comicImageContainer.classList.add('card-header', 'card-image');
        let comic_img = document.createElement('img');
        let comicName = document.createElement('span');
        comicName.classList.add('comic-name');



        // create comic detail

        let comicDetail = document.createElement('div');
        comicDetail.classList.add('card-detail');
        let comicDescription = document.createElement('p');
        let pageCount = document.createElement('p');

        let comicPrice = document.createElement('p');



        // create comic footer

        let comicFooter = document.createElement('div');
        comicFooter.classList.add('card-footer');
        let comicAttribution = document.createElement('p');

        comicImageContainer.appendChild(comic_img);
        comicImageContainer.appendChild(comicName);

        // add data to the comic image container

        comic_img.src = comic.thumbnail.path + '.' + comic.thumbnail.extension;


        // add data to the comic detail
        comicName.innerHTML = comic.title;
        comicPrice.innerHTML = "price: " + comic.prices[0].price;
        pageCount.innerHTML = "page count: " + comic.pageCount;
        if (comic.description !== '' && comic.description !== null) {
            comicDescription.innerText = comic.description;
        } else {

            comicDescription.innerHTML = "No description available for this comic";
        }


        // add data to the comic footer

        comicAttribution.innerHTML = getAttributionText();





        // append the comic image and comic name to the comic image container




        // append comic description  to the comic detail

        comicDetail.appendChild(comicDescription);
        comicDetail.appendChild(comicAttribution);
        comicDetail.appendChild(comicPrice);
        comicDetail.appendChild(pageCount);

        // append comic attribution to the comic container
        comicFooter.appendChild(comicAttribution);


        // append comic image container, comic detail and comic footer to the comic container
        comic_card.appendChild(comicImageContainer);
        comic_card.appendChild(comicDetail);
        comic_card.appendChild(comicFooter);


        // add comic container to the grid
        cardGrid.appendChild(comic_card);


    });
}

// this function is removes the child elements of the grid so we can populate it with new data once the user searches for a new hero
function removeChildElements() {
    if (cardGrid.hasChildNodes()) {
        while (cardGrid.firstChild) {
            cardGrid.removeChild(cardGrid.firstChild);
        }
    }
    return;
}