'use strict';
import Express from 'express';
import fs from 'fs';
const scanner = Express.Router();
scanner.get('/scanner/:reference',async(req,res)=>{
    const reference = req.params.reference;
    if(fs.existsSync("/tmp/"+reference+".txt")){
        res.status(200).json("scanned");
    }
    else{
        res.status(200).json("none");
    }
});
export {scanner};