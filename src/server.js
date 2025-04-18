// *********************************************************************************
// name: mcswap-api
// author: @SolDapper
// repo: github.com/SolDapper/mcswap-api
// *********************************************************************************

// *********************************************************************************
// initialize server
import {host,cleanup,filter} from './config.js';
import open from 'open';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
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
import { payment } from './actions/payment.js';
app.use("/", payment);
import { scanner } from './actions/scanner.js';
app.use("/", scanner);
// *********************************************************************************

// *********************************************************************************
app.get('/ping', cors(filter), async(err,req,res,next)=>{
  if(err.message){
    res.status(200).json("Access Denied!");
  }
  else{
    res.status(200).json("ok");
  }
});
app.get("/",(req,res)=>{res.status(200).json("mcswap-api server");});
app.listen(process.env.PORT || 3300, async() => {
  console.log("mcswap-api is running!");
  const clean = setInterval(()=>{
  const files = fs.readdirSync("/tmp/");
  const fileDetails = files.map(file=>{
    const filePath = path.join("/tmp/",file);
    const stats = fs.statSync(filePath);
    const now = Date.now();
    if((now-stats.mtimeMs)>120000){fs.unlink(filePath,(err)=>{if(err){return;}});}
  });
  }, cleanup);
  if(host.includes("localhost")){open("http://localhost:3300");}
});
// *********************************************************************************