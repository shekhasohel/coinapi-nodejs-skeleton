const axios = require('axios');
const EventEmitter = require('events');

const coinAPIURL = 'https://rest.coinapi.io';

class CoinAPI extends EventEmitter {

    constructor(key) {
        super();
        const instance = axios.create({
            baseURL: coinAPIURL,
            headers: { 'X-CoinAPI-Key': key }
        });

        this.key = key;
        this.instance = instance;
    }

    _request(path) {
        const self = this;
        return new Promise(function(resolve, reject) {
            self.instance.get(path)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    console.log('error ', error)
                    reject(error);
                })
        })
    }

    _getParamString(params) {
        Object.keys(params).forEach((key) => (params[key] == null) && delete params[key]);
        var paramString = Object.keys(params).map(function(key) {
            if (params[key]) {
                return key + '=' + params[key];
            }
        }).join('&')
        return Object.keys(params).length > 0 ? '?' + paramString : '';
    }

    /**
     * Docs: https://docs.coinapi.io/#exchange-rates
     */

    exchangeRate(base, quote, time) {
        const params = this._getParamString({
            time: time
        });
        return this._request(`/v1/exchangerate/${base}/${quote}${params}`)
    }

    /**
     * Docs: https://docs.coinapi.io/#historical-data34
     */

    quotesHistorical(symbol_id, time_start, time_end, limit) {
        const params = this._getParamString({
            time_start: time_start,
            time_end: time_end,
            limit: limit
        });
        return this._request(`/v1/quotes/${symbol_id}/history${params}`)
    }
}

module.exports = CoinAPI;