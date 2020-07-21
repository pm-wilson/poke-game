// import functions and grab DOM elements
import { pokemonData } from "./pokemonData.js";
import { getPossibleEncounters, getThreeDifferentRandoms } from "./pokemonUtils.js";

// initialize state
let encounteredArray = [],
    caughtArray = [],
    catchTries = 0,
    lastGameIdsArray = [];

// set event listeners to update state and DOM
let userSelectLabelArray = document.querySelectorAll('label'),
    userSelectInputArray = document.querySelectorAll('input'),
    userSelectImageArray = document.querySelectorAll('img');

function setupGameRound() {
    const possibleEncounters = getPossibleEncounters(pokemonData, lastGameIdsArray),
        threeRandomEncounters = getThreeDifferentRandoms(possibleEncounters);

    console.log(threeRandomEncounters);

    //set pictures and choose location
    for (var i = 0; i < 3; i++) {
        const currentImage = userSelectImageArray[i],
            currentLabel = userSelectLabelArray[i],
            currentInput = userSelectInputArray;

        //set picture

        //set location

        //set event listener
        currentInput.addEventListener('click', (e) => userSelect(e.target.value));


    }


    /*
        userSelectInputArray.forEach((userSelectInput) => {
            userSelectInput.addEventListener('click', (e) => {
                const usersClickIndex = e.target.value;
    
                userSelect(threeRandomEncounters[usersClickIndex]);
            });
        });
        */
}

function userSelect(usersSelection) {
    console.log(usersSelection);
}


setupGameRound();