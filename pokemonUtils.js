export function chooseRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
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