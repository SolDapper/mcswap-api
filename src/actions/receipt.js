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
        // res.status(200).json(body);

        console.log(process.env.MAIL_EMAIL);

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail', 
        //     auth: {
        //         user: process.env.MAIL_EMAIL,
        //         pass: process.env.MAIL_PASS
        //     }
        // });
        // console.log(transporter);

        // let mailOptions = {
        //     from: body.Seller_Email, // Sender address
        //     to: body.Buyer_Email, // List of recipients
        //     subject: 'Asset Purchase', // Subject line
        //     text: 'Hello from Node.js!', // Plain text body
        //     html: '<b>Hello from Node.js!</b>' // HTML body
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         res.status(200).json("error");
        //     }
        //     else{
        //         res.status(200).json("ok");
        //     }
        // });

    // }

});
export {receipt};