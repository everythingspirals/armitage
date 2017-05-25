import shapeshift from 'shapeshift';
import Exchange from './exchange';

class Shapeshift extends Exchange{
    get method() {
        return (ticker) =>{
            return shapeshift.getRate(ticker);
        }
        
    }

    get rate(){
        return (data) => {
            return parseFloat(data.body.rate);
        }
    }
}

export default Shapeshift;