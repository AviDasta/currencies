let input = document.querySelector(".input");
let allDivs = document.querySelector(".allDivs");

let API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false";
fetch(API_URL)
    .then(function(response) {
        return (response.json());
    })
    .then(function(data) {
        function createElements(arr) {
            allDivs.innerHTML = '';
            arr.forEach((element) => {
                allDivs.innerHTML += `
                    <hr class="text-white">
                    <div class ="container">
                    <div class = "row text-white">
                    <img class="col-1" src=${element.image} style="height:30px; width:60px;">
                    <p class="col-2 text-right">${element.name}</p>
                    <p class="col-1">${element.symbol}</p>
                    <p class="col-1">${element.current_price}</p>
                    <p class="col-2">${element.total_volume}</p>
                    ${precentageColor(element.price_change_percentage_24h)}
                    <p class="col-3">${element.market_cap}</p>
                    </div>
                    </div>
                    `
            });
        }
        createElements(data);
        input.addEventListener('input', function() {
            let inputValue = input.value;
            console.log(inputValue);
            filterCryptos(inputValue);
        });

        function filterCryptos(inputValue) {
            let filterArray = data.filter(function(crypto) {
                return crypto.name.toLowerCase().includes(inputValue);
            })
            createElements(filterArray);
        }
    });

function precentageColor(precent) {
    if (precent < 0) {
        return `<p class="price col-2 text-danger">${precent}%</p>`;
    } else {
        return `<p class="price col-2 text-success">${precent}%</p>`;
    }
}