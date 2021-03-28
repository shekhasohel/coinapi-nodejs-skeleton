const config = require('../config/config.json');
const CoinAPI = require('../repository/coinapi.js');
const expect = require('chai').expect;
let coinAPI = new CoinAPI(config.CoinAPIKey);

describe('coinapi.js tests', () => {
    describe('exchangeRate() Test', () => {
        it('should match price', () => {
            coinAPI.exchangeRate('BTC', 'USD', '2021-03-24T00:30:00.0000000Z').then(function(data) {
                expect(data.rate).to.equal("53862.4858197809");
            })
        });
    });
    
    // describe('quotesHistorical() Test', () => {
    //     it('should match size', () => {
    //         coinAPI.quotesHistorical('BITSTAMP_SPOT_BTC_USD', '2021-01-15T00:00:00').then(function(data) {
    //             expect(data.rate).to.equal("53862.4858197809");
    //         })
    //     });
    // });
});