// import functions and grab DOM elements
import { pokemonData } from './pokemonData.js';
import {
    getPossibleEncounters,
    getThreeDifferentRandoms,
    saveToLocalStorage,
    getRandomLocation,
    getItemFromArrayWithId,
    getRandomBackground
} from './pokemonUtils.js';

// initialize state
let encounteredArray = [],
    caughtArray = [],
    catchTries = 0,
    lastGameIdsArray = [],
    currentRandomChoices = [];

//get elements
const userSelectInputArray = document.querySelectorAll('input'),
    userSelectImageArray = document.querySelectorAll('img'),
    backgroundArea = document.querySelector('main'),
    pokemonSeen = document.getElementById('pokemon-seen');


function setupGameRound() {
    const possibleEncounters = getPossibleEncounters(pokemonData, lastGameIdsArray),
        threeRandomEncounters = getThreeDifferentRandoms(possibleEncounters),
        randomBackground = getRandomBackground();

    // update last game list
    lastGameIdsArray = threeRandomEncounters.slice();

    //set background
    backgroundArea.style.backgroundImage = randomBackground;

    //update encountered array
    updateEncountered(threeRandomEncounters);

    //update Pokemon seen
    pokemonSeen.textContent = countEncountered();
    currentRandomChoices = threeRandomEncounters;
    //set pictures and choose location
    for (let i = 0; i < 3; i++) {
        const currentImage = userSelectImageArray[i],
            randomLocation = getRandomLocation(i),
            locationId = document.getElementById('b' + i);
        //set picture
        currentImage.src = threeRandomEncounters[i].url_image;

        //set location
        locationId.style.top = randomLocation[0] + 'px';
        locationId.style.left = randomLocation[1] + 'px';
    }
}

function updateEncountered(threeRandomEncounters) {
    for (let i = 0; i < threeRandomEncounters.length; i++) {
        const currentEncounterObject = threeRandomEncounters[i],
            currentObjectId = currentEncounterObject._id,
            itemToIncrease = getItemFromArrayWithId(currentObjectId, encounteredArray);

        if (itemToIncrease) {
            itemToIncrease.quantity++;
        } else {
            encounteredArray.push({ id: currentObjectId, quantity: 1 });
        }
    }
}

function updateCaught(usersSelection) {
    const pokemonToIncrease = getItemFromArrayWithId(usersSelection._id, caughtArray);

    if (pokemonToIncrease) {
        pokemonToIncrease.quantity++;
    } else {
        caughtArray.push({ id: usersSelection._id, quantity: 1 });
    }
}

function userSelect(e, threeRandomEncounters) {
    const chosenButton = e.target.value,
        chosenPokemon = threeRandomEncounters[chosenButton],
        capturedPokemon = document.getElementById('pokemon-basket');

    catchTries += 1;
    capturedPokemon.textContent = catchTries;
    updateCaught(chosenPokemon);

    if (catchTries === 10) {
        //save caught and seen to local storage
        saveToLocalStorage(encounteredArray, caughtArray);
        //go to results page

        console.log("end game");
    } else {
        //rebuildButtonArea();
        setupGameRound();
    }
}

function countEncountered() {
    let count = 0;

    for (let i = 0; i < encounteredArray.length; i++) {
        const currentEncounteredItem = encounteredArray[i];

        count += currentEncounteredItem.quantity;
    }
    return count;
}

function initializeGame() {
    for (let i = 0; i < 3; i++) {
        const currentInput = userSelectInputArray[i];
        //set event listener
        currentInput.addEventListener('click', (e) => {
            userSelect(e, currentRandomChoices);
        });
    }
    setupGameRound();
}

initializeGame();