'use strict';
import 'dotenv/config';
// *********************************************************************************
var host = "https://api.mcswap.xyz"; // your live domain
// host = "http://localhost"; // comment out before production deployment
var auto = "payment"; // auto open blink in dial.to test window : ignored in prod
var treasury = "ACgZcmgmAnMDxXxZUo9Zwg2PS6WQLXy63JnnLmJFYxZZ";
var fee = "0";
// *********************************************************************************
if(host.includes("localhost")){host=host+":3300";}
var rpc = process.env.RPC;
export var host, auto, rpc, treasury, fee;
// *********************************************************************************