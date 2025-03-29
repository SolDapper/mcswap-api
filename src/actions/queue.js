'use strict';
import Express from 'express';
import fs from 'fs';
const queue = Express.Router();
queue.get('/queue/:reference',async(req,res)=>{
    const reference = req.params.reference;
    if(fs.existsSync("./src/queue/"+reference+".txt")){
        res.status(200).json("scanned");
    }
    else{
        res.status(200).json("none");
    }
});
export {queue};