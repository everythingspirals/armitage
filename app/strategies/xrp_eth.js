import GateHub from '../exchanges/gatehub';
import Strategy from './strategy';

let gatehub = new GateHub(['xrp_eth']);

class XRP_ETH extends Strategy {
    get name() {
        return 'XRP_ETH';
    }

    get exchanges() {
        return [
            {
                name: 'GateHub',
                class: gatehub
            }
        ]
    }

    get arbitrate(){
        return 0;
    }
}

export default XRP_ETH;