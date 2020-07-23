import {
    loadFromLocalStorage,
    getMungedData
} from './pokemonUtils.js';
import { pokemonData } from './pokemonData.js';

const backgroundArea = document.querySelector('#background-image-area'),
    gameData = loadFromLocalStorage(),
    ctx = document.getElementById('myChart').getContext('2d'),
    mungedData = getMungedData(gameData, pokemonData),
    resetButton = document.querySelector('#reset-game'),
    historyButton = document.querySelector('#results-history');

const chartLabelsArray = mungedData[0],
    chartEncounteredData = mungedData[1],
    chartCaughtData = mungedData[2],
    chartColors1Array = mungedData[3];

Chart.defaults.global.defaultFontColor = 'black';//eslint-disable-line
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
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 10,
                bottom: 80
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

resetButton.addEventListener('click', () => {
    window.location.href = './index.html';
});

historyButton.addEventListener('click', () => {
    window.location.href = './history.html';
});

function loadResultsPage() {
    //change background
    backgroundArea.style.backgroundImage = 'url(./assets/backgrounds/background-results.jpg)';
}

loadResultsPage();