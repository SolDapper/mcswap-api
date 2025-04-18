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
        const msg = '';

        msg += '<table cellpadding="0" cellspacing="0" width="100%">';
        msg += '<tr>';
        msg += '<td>&nbsp;a</td>';
        msg += '<td width="600">b</td>';
        msg += '<td>&nbsp;c</td>';
        msg += '</tr>';
        msg += '</table>';









        let transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASS
            }
        });
        let mailOptions = {
            from: body.Seller_Email,
            sender: body.Seller_Email,
            replyTo: body.Seller_Email,
            to: body.Buyer_Email+","+body.Seller_Email,
            subject: 'Asset Purchase Receipt',
            text: 'Hello from Node.js!',
            html: msg
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