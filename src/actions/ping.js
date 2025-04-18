'use strict';
import {whitelist} from '../config.js';
import Express from 'express';
const ping = Express.Router();
const options = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
};
// ping.get('/ping', cors(options), async(req,res)=>{
ping.get('/ping', async(req,res)=>{
  res.status(200).json(res);
  // res.status(200).json("ok");
});
export {ping};