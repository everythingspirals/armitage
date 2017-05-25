import axios from 'axios';
import Exchange from './exchange';

class GateHub extends Exchange {
    get interval(){
        return 2000;
    }

    get method() {
        return (ticker) => {
            let pair = ticker.toUpperCase().replace('_','/');
            let url = `https://data.ripple.com/v2/exchanges/${pair}+rcA8X3TVMST1n3CJeAdGk1RdRCHii7N2h?descending=true&interval=1hour&limit=1`;
            return axios.get(url);
        }

    }

    get rate(){
        return (result) => {
            return parseFloat(result.data.exchanges[0].high);
        }
    }
}

export default GateHub;