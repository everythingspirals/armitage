import GeminiAPI from 'gemini-api';
import Exchange from './exchange';

const api = new GeminiAPI({ sandbox: false });

class Gemini extends Exchange {
    get method() {
        return (ticker) => {
            ticker = ticker.toLowerCase().replace('_', '');
            return api.getTicker('ethbtc')
        }
    }

    get rate() {
        return (data) => {
            return parseFloat(data.last);
        }
    }
}

export default Gemini;