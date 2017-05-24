import shapeshift from 'shapeshift';
import GeminiAPI from 'gemini-api';
import Gdax from 'gdax';
import PoloniexAPI from 'poloniex-api-node';

class ETH {
    constructor() {
        this.shapeshift = new Shapeshift();
        this.gemini = new Gemini();
        this.gdax = new GDAX();
        //this.poloniex = new Poloniex();

        this.arbitrate();
    }

    display() {
        let display = `
        ---------------------------------
       | Exchange   | ETH/BTC | BTC/ETH  |
       | ---------------------------------
       | Shapeshift | ${this.getRate(this.shapeshift, 'eth_btc')} | ${this.getRate(this.shapeshift, 'btc_eth')} |
       | ---------------------------------
       | Gemini     | ${this.getRate(this.gemini, 'eth_btc')} | ${this.getRate(this.gemini, 'btc_eth')} |
       | ---------------------------------
       | GDAX       | ${this.getRate(this.gdax, 'eth_btc')} | ${this.getRate(this.gdax, 'btc_eth')} |
       ----------------------------------
        `
        console.log(display);
    }

    getRate(data, ticker) {
        let rate = data.rates && data.rates[ticker] && data.rates[ticker] || 0.0;
        return rate.toFixed(5);
    }

    arbitrate() {
        let eth_btc = Math.max(
            this.shapeshift.rates.eth_btc,
            this.gemini.rates.eth_btc,
            this.gdax.rates.eth_btc
        );

        let btc_eth = Math.max(
            this.shapeshift.rates.eth_btc,
            this.gemini.rates.eth_btc,
            this.gdax.rates.eth_btc
        );

        let gain = eth_btc * btc_eth - 1;
        this.display();
        console.log(gain);
        setTimeout(this.arbitrate.bind(this), 1000);
    }
}

//Shapeshift
class Shapeshift {
    constructor() {
        this.rates = {
            eth_btc: 0.0,
            btc_eth: 0.0
        }

        this.tickers = ['eth_btc', 'btc_eth'];
        this.getRates();
    }

    getRates() {
        this.tickers.map(ticker => {
            shapeshift.getRate(ticker).then((data) => {
                this.onRateReceived(data, ticker);
            });
        });

        setTimeout(this.getRates.bind(this), 500);
    }

    onRateReceived(data, ticker) {
        let rate = parseFloat(data.body.rate);
        if (rate) {
            this.rates[ticker] = rate;
        }

    }
}

class Gemini {
    constructor() {
        this.rates = {
            eth_btc: 0.0,
            btc_eth: 0.0
        }

        this.tickers = ['eth_btc', 'btc_eth'];
        this.getRates();
    }

    getRates() {
        //const socket = new GeminiAPI.WebsocketClient({ sandbox: false });
        const restClient = new GeminiAPI({ sandbox: false });

        restClient.getTicker('ethbtc')
            .then((data) => {
                this.onRateRecieved(data, 'eth_btc')
            })
            .catch((err) => {
                console.log(err)
            });

    }

    onRateRecieved(data, ticker) {
        let rate = parseFloat(data.last);
   
        if (rate) {
            this.rates['eth_btc'] = rate;
            this.rates['btc_eth'] = 1 / rate;
        }

        setTimeout(this.getRates.bind(this),500);
    }
}


class GDAX {
    constructor() {
        this.rates = {
            eth_btc: 0.0,
            btc_eth: 0.0
        }

        this.tickers = ['ETH-BTC'];
        this.getRates();
    }

    getRates() {
        const socket = new Gdax.WebsocketClient(this.tickers);
        socket.on('message', (data) => {
            this.onRateRecieved(data);
        });
    }

    onRateRecieved(data) {
        let price = parseFloat(data.price);

        if (price) {
            //let ticker = data.product_id.toLowerCase().replace('-', '_');
            this.rates['eth_btc'] = price;
            this.rates['btc_eth'] = 1 / price;
        }

    }
}

class Poloniex {
    constructor() {
        let poloniex = new PoloniexAPI({ socketTimeout: 15000 });
        poloniex.returnTicker((err, data) => {
            console.log(data)
        });
    }
}

let eth = new ETH();




//     //Gemini
//     geminiEthBtc() {
//         const socket = new GeminiAPI.WebsocketClient({ sandbox: false });

//         socket.openMarketSocket('ethbtc', () => {
//             socket.addMarketMessageListener(onGeminiPrice);
//         });
//     }

//     //GDAX
//     gdaxEthBtc() {
//         const socket = new Gdax.WebsocketClient(['ETH-BTC']);
//         socket.on('message', function (data) { console.log(data); });
//     }
// }


// //Init Gemini Socket
// function initGemini() {
//     const socket = new GeminiAPI.WebsocketClient({ sandbox: false });

//     socket.openMarketSocket('ethbtc', () => {
//         socket.addMarketMessageListener(onGeminiPrice);
//     });
// }

// //On Gemini Price


//     var rate = parseFloat(event.price);
//     rates.gemini = parseFloat(rate),
//         output();
// }

// function initShapeshift() {
//     onShapeshiftPrice();
// }

// async function onShapeshiftPrice() {

// }

// //getSpread
// function getGain() {
//     return (rates.gemini * rates.shapeshift) - 1;
// }

// function output() {
//     let gain = getGain();
//     process.stdout.clearLine();
//     process.stdout.cursorTo(0);
//     process.stdout.write(gain.toString());
// }

// //Main
// function main() {
//     //initShapeshift();
//     //initGemini();
//     initGDAX();
// }

// main();