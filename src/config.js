'use strict';
import 'dotenv/config';
import Express from 'express';
// *********************************************************************************

var host = "http://api.mcswap.xyz"; // your live domain
host = "http://localhost"; // comment out before production deployment
var auto = "payment"; // auto open blink in dial.to test window : ignored in prod
var treasury = "ACgZcmgmAnMDxXxZUo9Zwg2PS6WQLXy63JnnLmJFYxZZ";
var whitelist  = ['http://www.mcswap.xyz', 'http://localhost:3300'];
var fee = "0";

// *********************************************************************************
const referrerCheck = (req, res, next) => {
    const referrer = req.get('referer');
    if (referrer && whitelist.includes(new URL(referrer).origin)) {
      next();
    } else {
      res.status(403).send('Access Denied');
    }
};
const app  = Express();
app.use(referrerCheck);
// *********************************************************************************
if(host.includes("localhost")){host=host+":3300";}
var rpc = process.env.RPC;
export var host, auto, rpc, treasury, fee;
// *********************************************************************************