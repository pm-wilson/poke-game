import {
    loadFromLocalStorage,
    getMungedData
} from './pokemonUtils.js';
import { pokemonData } from './pokemonData.js';

const backgroundArea = document.querySelector('#background-image-area'),
    gameData = loadFromLocalStorage(),
    ctx = document.getElementById('myChart').getContext('2d'),
    mungedData = getMungedData(gameData, pokemonData);

const chartLabelsArray = mungedData[0],
    chartEncounteredData = mungedData[1],
    chartCaughtData = mungedData[2],
    chartColors1Array = mungedData[3],
    chartColors2Array = mungedData[4],
    chartColors3Array = mungedData[5];
console.log(chartLabelsArray)
var myChart = new Chart(ctx, {//eslint-disable-line
    type: 'bar',
    data: {
        labels: chartLabelsArray,
        datasets: [{
            label: 'Pokemon Encountered',
            data: chartEncounteredData,
            backgroundColor: 'hsla(138, 96%, 68%, 0.5)',
            borderColor: chartColors1Array,
            borderWidth: 5
        },
        {
            label: 'Pokemon Caught',
            data: chartCaughtData,
            backgroundColor: 'hsl(336, 100%, 50%, 0.5)',
            borderColor: chartColors1Array,
            borderWidth: 5
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function loadResultsPage() {
    //change background
    backgroundArea.style.backgroundImage = 'url(./assets/backgrounds/background-results.jpg)';



}


loadResultsPage();