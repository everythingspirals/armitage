
// class GDAX {
//     constructor() {
//         this.rates = {
//             eth_btc: 0.0,
//             btc_eth: 0.0
//         }

//         this.tickers = ['ETH-BTC'];
//         this.getRates();
//     }

//     getRates() {
//         const socket = new Gdax.WebsocketClient(this.tickers);
//         socket.on('message', (data) => {
//             this.onRateRecieved(data);
//         });
//     }

//     onRateRecieved(data) {
//         let price = parseFloat(data.price);

//         if (price) {
//             //let ticker = data.product_id.toLowerCase().replace('-', '_');
//             this.rates['eth_btc'] = price;
//             this.rates['btc_eth'] = 1 / price;
//         }

//     }
// }