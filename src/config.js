'use strict';
import 'dotenv/config';
import Express from 'express';
// *********************************************************************************

var host = "https://www.mcswap-pay.xyz"; // your live domain
// host = "http://localhost"; // comment out for prod
var treasury = "ACgZcmgmAnMDxXxZUo9Zwg2PS6WQLXy63JnnLmJFYxZZ"; // optional affiliate treasury
var fee = "0"; // optional affiliate fee
var cleanup = 30000; // cleanup every n miliseconds
var whitelist = ["https://www.mcswap.xyz"];

// *********************************************************************************
var filter = {origin:(origin,callback)=>{if(whitelist.includes(origin)){callback(null,true);}else{callback(new Error('Not allowed by CORS'));}},methods:['GET','POST'],credentials: true,};
if(host.includes("localhost")){host=host+":3300";}
var rpc = process.env.RPC;
export var host, rpc, treasury, fee, cleanup, filter;
// *********************************************************************************