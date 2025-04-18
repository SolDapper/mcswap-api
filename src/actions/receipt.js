'use strict';
import {rpc,filter} from '../config.js';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer'
const receipt = express();
receipt.post('/receipt', cors(filter), async(err,req,res,next)=>{
    // if(err.message){
    //     res.status(200).json("Access Denied!");
    // }
    // else{
        const body  = req.body;
        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASS
            }
        });
        // to: body.Buyer_Email+","+body.Seller_Email,
        // from: body.Seller_Email,
        let mailOptions = {
            sender: body.Seller_Email,
            replyTo: body.Seller_Email,
            to: body.Buyer_Email+","+body.Seller_Email,
            subject: 'Asset Purchase Receipt',
            text: 'Hello from Node.js!',
            html: '<b>Hello from Node.js!</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(200).json("error");
            }
            else{
                res.status(200).json("ok");
            }
        });
    // }
});
export {receipt};