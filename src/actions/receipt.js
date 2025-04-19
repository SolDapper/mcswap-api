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
        let msg = '';
        msg += '<table cellpadding="0" cellspacing="0" width="100%">';
        msg += '<tr><td>Asset Name: </td><td width="600">'+body.Asset_Name+'</td></tr>';
        msg += '<tr><td>Description: </td><td width="600">'+body.Asset_Name+'</td></tr>';
        msg += '<tr><td>Seller Email: </td><td width="600">'+body.Seller_Email+'</td></tr>';
        msg += '<tr><td>Buyer Email: </td><td width="600">'+body.Buyer_Email+'</td></tr>';
        msg += '<tr><td>Buyer Name: </td><td width="600">'+body.Buyer_Name+'</td></tr>';
        msg += '<tr><td>Buyer Address: </td><td width="600">'+body.Buyer_Address+'</td></tr>';
        msg += '<tr><td>Image: </td><td width="600">'+body.Image+'</td></tr>';
        msg += '<tr><td>Format: </td><td width="600">'+body.Format+'</td></tr>';
        msg += '<tr><td>Listing: </td><td width="600">'+body.Listing+'</td></tr>';
        msg += '<tr><td>Seller: </td><td width="600">'+body.Seller+'</td></tr>';
        msg += '<tr><td>Buyer: </td><td width="600">'+body.Buyer+'</td></tr>';
        msg += '<tr><td>Token Symbol: </td><td width="600">'+body.Token+'</td></tr>';
        msg += '<tr><td>Token Mint: </td><td width="600">'+body.Mint+'</td></tr>';
        msg += '<tr><td>Tokens Paid: </td><td width="600">'+body.Tokens_Paid+'</td></tr>';
        msg += '<tr><td>SOL Paid: </td><td width="600">'+body.SOL_Paid+'</td></tr>';
        msg += '<tr><td>Signature: </td><td width="600"><a target="_blank" href="https://solana.fm/tx/'+body.Signature+'">View Transaction</a></td></tr>';
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