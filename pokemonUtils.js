import { userDataLabel } from './constants.js';

export function chooseRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

export function isItemInArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        const currentArrayItem = array[i];

        if (currentArrayItem === item) {
            return true;
        }
    }
    return false;
}

export function getPossibleEncounters(arrayOfPossible, arrayOfLastGameIds) {
    const possibleEncounters = [];

    for (let i = 0; i < arrayOfPossible.length; i++) {
        const currentPokeObject = arrayOfPossible[i];

        if (isItemInArray(currentPokeObject._id, arrayOfLastGameIds) === false) {
            possibleEncounters.push(currentPokeObject);
        }
    }
    return possibleEncounters;
}

export function removeItemFromArray(item, array) {
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        const currentArrayItem = array[i];

        if (currentArrayItem !== item) {
            newArray.push(currentArrayItem);
        }
    }
    return newArray;
}

export function getThreeDifferentRandoms(array) {
    let possibleList = array.slice(),
        differentRandoms = [];

    for (var i = 0; i < 3; i++) {
        const currentRandom = chooseRandomItemFromArray(possibleList);
        differentRandoms.push(currentRandom);
        possibleList = removeItemFromArray(currentRandom, possibleList);
    }

    return differentRandoms;
}

export function getRandomLocation(buttonNumber) {
    const multiplier = Number(buttonNumber) + 1,
        randomTop = Math.floor(Math.random() * 100) + (multiplier * 100),
        randomSide = Math.floor(Math.random() * 500) + (multiplier * 75);

    return [randomTop, randomSide];
}

export function getRandomBackground() {
    const randomNumber = Math.floor(Math.random() * 6);

    return 'url(./assets/backgrounds/background' + randomNumber + '.jpg)';
}

export function saveToLocalStorage(encounteredArray, caughtArray) {
    const gameData = { pokemonEncountered: encounteredArray, pokemonCaught: caughtArray },
        saveGameLabel = userDataLabel + '-' + localStorage.length,
        stringyGameData = JSON.stringify(gameData);

    localStorage.setItem(saveGameLabel, stringyGameData);
}

export function loadFromLocalStorage() {
    const dataToGet = localStorage.length - 1,
        stringyData = localStorage.getItem(userDataLabel + '-' + dataToGet),
        gameData = JSON.parse(stringyData);

    return gameData;
}

export function getSize() {
    const randomNum = Math.floor(Math.random() * 5);

    switch (randomNum) {
        case 0: return '30px';
        case 1: return '80px';
        case 2: return '101px';
        case 3: return '115px';
        case 4: return '125px';
    }
}

export function getArrayWithoutObjWithIdFromArray(id, array) {
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        const currentArrayItem = array[i];

        if (currentArrayItem._id !== id) {
            newArray.push(currentArrayItem);
        }
    }
    return newArray;
}

export function getItemFromArrayWithId(id, array) {
    for (var i = 0; i < array.length; i++) {
        const currentArrayItem = array[i];

        if (currentArrayItem.id === id || currentArrayItem._id === id) {
            return currentArrayItem;
        }
    }
    return null;
}

function getQuantityWithId(id, array) {
    for (var i = 0; i < array.length; i++) {
        const currentArrayItem = array[i];

        if (id === currentArrayItem.id) {

            return currentArrayItem.quantity;
        }
    }
    return 0;
}

export function getMungedData(gameData, pokemonData) {
    const objectsToGetNamesFrom = gameData.pokemonEncountered,
        names = [],
        encountered = [],
        caught = [],
        color1 = [],
        color2 = [],
        colorf = [];

    for (let i = 0; i < objectsToGetNamesFrom.length; i++) {
        const currentDataObject = objectsToGetNamesFrom[i];

        const currentObject = getItemFromArrayWithId(currentDataObject.id, pokemonData),
            currentCaughtQuantity = getQuantityWithId(currentDataObject.id, gameData.pokemonCaught);

        names.push(convertNameToUpperCase(currentObject.pokemon));
        encountered.push(currentDataObject.quantity);
        caught.push(currentCaughtQuantity);
        color1.push(currentObject.color_1);
        color2.push(currentObject.color_2);
        colorf.push(currentObject.color_f);
    }
    return [names, encountered, caught, color1, color2, colorf];
}

function convertNameToUpperCase(name) {
    const firstLetter = name.charAt(0),
        firstLetterUpper = firstLetter.toUpperCase(),
        restOfNameArray = name.split('');

    let newName = firstLetterUpper;

    for (let i = 1; i < restOfNameArray.length; i++) {
        const currentLetter = restOfNameArray[i];

        newName += currentLetter;
    }
    return newName;
}

function loadGameFromLocalStorage(gameNum) {
    const dataToGet = gameNum,
        stringyData = localStorage.getItem(userDataLabel + '-' + dataToGet),
        gameData = JSON.parse(stringyData);

    return gameData;
}

function getRefFromArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (item === array[i]) {
            return i;
        }
    }
    return null;
}

function getInfoFromData(id, pokemonData) {
    for (let i = 0; i < pokemonData.length; i++) {
        const currentPokeInfo = pokemonData[i];
        if (id === currentPokeInfo.id || id === currentPokeInfo._id) {
            const name = currentPokeInfo.pokemon,
                color1 = currentPokeInfo.color_1,
                color2 = currentPokeInfo.color_2,
                colorf = currentPokeInfo.color_f;

            return [name, color1, color2, colorf];
        }
    }
    return null;
}

function getCountFromArray(id, array) {
    for (let i = 0; i < array.length; i++) {
        const currentItem = array[i];

        if (currentItem.id === id) {
            return currentItem.quantity;
        }
    }
    return 0;
}

export function mungedHistoryData(pokemonData) {
    const ids = [],
        names = [],
        encountered = [],
        caught = [],
        color1 = [],
        color2 = [],
        colorf = [];

    for (let i = 0; i < localStorage.length; i++) {
        const currentStorageObject = loadGameFromLocalStorage(i),
            currentEncountered = currentStorageObject.pokemonEncountered,
            currentCaught = currentStorageObject.pokemonCaught;

        for (let n = 0; n < currentEncountered.length; n++) {
            const currentEncounteredItem = currentEncountered[n],
                itemInArray = isItemInArray(currentEncounteredItem.id, ids);

            if (itemInArray) {
                const idRef = getRefFromArray(currentEncounteredItem.id, ids);
                encountered[idRef] += currentEncounteredItem.quantity;
                caught[idRef] += getCountFromArray(currentEncounteredItem.id, currentCaught);
            } else {
                const currentInfo = getInfoFromData(currentEncounteredItem.id, pokemonData);

                ids.push(currentEncounteredItem.id);
                encountered.push(currentEncounteredItem.quantity);
                caught.push(getCountFromArray(currentEncounteredItem.id, currentCaught));
                names.push(convertNameToUpperCase(currentInfo[0]));
                color1.push(currentInfo[1]);
                color2.push(currentInfo[2]);
                colorf.push(currentInfo[3]);
            }
        }
    }

    return [names, encountered, caught, color1, color2, colorf];
}