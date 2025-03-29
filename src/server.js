// *********************************************************************************
// name: solana-action-express
// author: @SolDapper
// repo: github.com/SolDapper/mcswap-api
// *********************************************************************************

// *********************************************************************************
// initialize server
import {host,auto} from './config.js';
import open from 'open';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(bodyParser.json());
app.options('*', cors(
  {
    "methods": ["GET,PUT,POST,OPTIONS"],
    "allowedHeaders": ['Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Accept-Action-Version, X-Accept-Blockchain-Ids'],
    "exposeHeaders": ['X-Action-Version, X-Blockchain-Ids'],
    "preflightContinue": true,
    "optionsSuccessStatus": 204
  }
));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Encoding, Accept-Encoding');
  res.setHeader('X-Blockchain-Ids', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp');
  res.setHeader('X-Action-Version', '0.1');
  res.setHeader('Content-Encoding', 'compress');
  res.setHeader('Content-Type', 'application/json');
  next();
});
// initialize server
// *********************************************************************************

// *********************************************************************************
// include actions
// import { payment } from './actions/payment.js';
// app.use("/payment/*", payment);
import { queue } from './actions/queue.js';
app.use("/queue*", queue);
// *********************************************************************************

// *********************************************************************************
app.get("/",(req,res)=>{res.json("mcswap-api server");});
app.listen(process.env.PORT || 3300, async() => {
  console.log("mcswap-api is running!");
  const cleanup = setInterval(()=>{
    














  }, 10000);
  if(host.includes("localhost") && auto!=false){open("http://localhost:3300/");}
});
// *********************************************************************************