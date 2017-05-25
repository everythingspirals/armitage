class Exchange {
    constructor(tickers) {
        this.tickers = [];
        this.rates = {};

        tickers.forEach(ticker => {
            this.tickers.push(ticker);
            this.rates[ticker] = 0.0;
        });

        setInterval(this.getRates.bind(this), this.interval);
    }

    //Override
    get interval(){
        return 1000;
    }
    getRate(){}
    getMethod(){}


    //Inherit
    getRates(promise) {
        this.tickers.map(ticker => {
            this.method(ticker)
            .then((data) => {
                this.onRateReceived(data, ticker);
            })
            .catch((err)=>{
                console.log(err);
            });
        });
    }

    onRateReceived(data, ticker) {
        let rate = this.rate(data);
        if (rate) {
            this.rates[ticker] = rate;
        }

    }
}

export default Exchange;