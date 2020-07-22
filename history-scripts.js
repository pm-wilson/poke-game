import { mungedHistoryData } from './pokemonUtils.js';
import { pokemonData } from './pokemonData.js';

const resetButton = document.querySelector('#reset-game'),
    clearHistory = document.querySelector('#reset-history');

const mungedData = mungedHistoryData(pokemonData);

const ctx = document.getElementById('myChart').getContext('2d'),
    chartLabelsArray = mungedData[0],
    chartEncounteredData = mungedData[1],
    chartCaughtData = mungedData[2],
    chartColors1Array = mungedData[3];

let myChart = new Chart(ctx, {//eslint-disable-line
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

clearHistory.addEventListener('click', () => {
    localStorage.clear();
    clearHistory.textContent = 'History Clear';
    clearHistory.style.backgroundColor = 'hsla(206, 54%, 73%, 1)';
});