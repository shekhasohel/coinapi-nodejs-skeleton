const config = require('./config/config.json');
const CoinAPI = require('./repository/coinapi.js');
const fs = require('fs');
const tarGZ = require('tar.gz');

let coinAPI = new CoinAPI(config.CoinAPIKey);
let number_of_events = config.NumberOfEvents; //currently setting this to lower number due to COIN APIs limit for requests per day for free account
let delay_per_iteration = 2000;

let start_time = new Date(2021, 01, 15);
let time = new Date(2021, 01, 15);

let base = config.Base;
let quote = config.Quote;
let index = 0;

// This will hold the date extracted and results calculated
let resultData = {
    "rateList": [],
    "averageRate": 0,
    "averageSize": 0
}

// get exchange rates for number of events defined and store the results to process in the end
for (index = 0; index < number_of_events; index++) {
    // setting delay to get around COIN APIs limit on concurrent requests for free account
    setTimeout( () => {
        // each event is of one second delay
        time.setMinutes(start_time.getMinutes() - index);

        coinAPI.exchangeRate(base, quote, time.toISOString()).then(function(data) {
            resultData.rateList.push(data);
        })
    }, index * delay_per_iteration);
}

// setting delay to get around COIN APIs limit on concurrent requests for free account
setTimeout( () => {
    coinAPI.quotesHistorical("BITSTAMP_SPOT_" + quote + "_" + base, time.toISOString(), start_time.toISOString()).then(function(data) {
        
        // Calculate average price for received data 
        let sum = 0;
        resultData.rateList.forEach(block => {
            sum = sum + block.rate;
        });
        resultData.averageRate = sum / index;

        // Calculate average trade size for received data
        sum = 0;
        data.forEach(quote => {
            sum = sum + quote.bid_size;
        });
        resultData.averageSize = sum / data.length;

        // Store retrieved and extracted data in JSON file 
        fs.writeFileSync('./output/result.json', JSON.stringify(resultData));

        // Compress date JSON file with gz
        new tarGZ().compress('./output/result.json', './output/result.tar.gz',
        function(err){
            if(err)
                console.log("Error: " + err);
        });

        console.log("Average rate for " + number_of_events + " events is " + resultData.averageRate);
        console.log("Average size for " + data.length + " events is " + resultData.averageSize);
    })
}, index * delay_per_iteration);