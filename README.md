# mcswap-api
The mcswap api package runs solana pay & email receipt endpoints for your mcswap application

![powered by solana](https://camo.githubusercontent.com/4a0138729f5af10f6389f7030f00eca28d2963932c6c21e7f397f077d8a908d7/68747470733a2f2f6364366e61326c6d6132323267706967766971637072356e377565776778643775686f636b6f66656c666c7375616f70376f69712e617277656176652e6e65742f45507a516157774774614d3942716f674a3865745f516c6a58482d683343553470466c584b6748502d3545)

## clone it
```html
git clone https://github.com/SolDapper/mcswap-api.git
```

## .env
Create a .env file in your project directory with the following details
```html
RPC = https://staked.helius-rpc.com?api-key=YOUR_KEY_HERE
```

## config
Open src/config.js and add your api details
```javascript
var host = "https://www.mcswap-pay.xyz"; // your live domain
// host = "http://localhost"; // uncomment to run on localhost
var treasury = "ACgZcmgmAnMDxXxZUo9Zwg2PS6WQLXy63JnnLmJFYxZZ"; // optional affiliate treasury
var fee = "0"; // optional affiliate fee
var cleanup = 30000; // temporary file cleanup every n miliseconds
var whitelist = [host]; // array of domains allowed to process receipts
```

## run locally
```html
npm start
```
Open your browser to: http://localhost:3300