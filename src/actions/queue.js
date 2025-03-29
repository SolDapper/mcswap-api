'use strict';
import Express from 'express';
const queue = Express.Router();
queue.get('/queue/:reference',async(req,res)=>{
    const reference = req.params.reference;
    res.status(200).json(reference);
});
export {queue};