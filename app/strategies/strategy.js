
class Strategy {
    constructor(name, exchanges) {
        setInterval(this.display.bind(this), 500);
    }

    //Override
    getExchanges() { }

    //Inherit
    arbitrate() {
          let forward = this.getMax(this.strategy.forward);
        let backward = this.getMax(this.strategy.backward);
        let gain = forward * backward - 1;
        return gain;
    }
    
    getMax(value){
        return Math.max.apply(Math, this.exchanges.map(exchange => {
            let rate = exchange.class.rates[value];
            return !isNaN(rate) ? rate : 0;
        }));
    }

    display() {
        console.log(this.name);
        console.log('--------');
        this.exchanges.forEach(exchange => {
            console.log(exchange.name);
            console.log(exchange.class.rates);
        });
        console.log(this.arbitrate());
        console.log('');
    }
}

export default Strategy;