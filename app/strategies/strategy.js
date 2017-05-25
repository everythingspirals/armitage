
class Strategy {
    constructor(name, exchanges) {
        setInterval(this.display.bind(this), 500);
    }

    //Override
    getExchanges() { }
    arbitrate() {}

    //Inherit
    display() {
        console.log(this.name);
        console.log('--------');
        this.exchanges.forEach(exchange => {
            console.log(exchange.name);
            console.log(exchange.class.rates);
        });
        console.log(this.arbitrate);
        console.log('');
    }
}

export default Strategy;