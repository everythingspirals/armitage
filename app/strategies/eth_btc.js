import Shapeshift from '../exchanges/shapeshift';
import Gemini from '../exchanges/gemini';
import Strategy from './strategy';

let shapeshift = new Shapeshift(['eth_btc', 'btc_eth']);
let gemini = new Gemini(['eth_btc']);

class ETH_BTC extends Strategy {
    get name() {
        return 'ETH_BTC';
    }

    get exchanges() {
        return [
            {
                name: 'Shapeshift',
                class: shapeshift
            },
            {
                name: 'Gemini',
                class: gemini
            }
        ]
    }

    get arbitrate(){
        let eth_btc = Math.max(
            shapeshift.rates.eth_btc,
            gemini.rates.eth_btc,
        );

        let btc_eth = Math.max(
            shapeshift.rates.eth_btc,
            gemini.rates.eth_btc,
        );

        let gain = eth_btc * btc_eth - 1;
        return gain;
    }
}

export default ETH_BTC;