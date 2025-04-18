'use strict';
import Express from 'express';
import fs from 'fs';
const receipt = Express.Router();
receipt.route('/receipt').post(async(req,res)=>{
    const body  = req.body;
    
    // const reference = req.params.reference;
    // if(fs.existsSync("/tmp/"+reference+".txt")){
    //     res.status(200).json("scanned");
    // }
    // else{
        res.status(200).json(body);
    // }

    // let transporter = nodemailer.createTransport({
    //     service: 'gmail', 
    //     auth: {
    //         user: process.env.MAIL_EMAIL,
    //         pass: process.env.MAIL_PASS
    //     }
    // });
    // console.log(transporter);

    // let mailOptions = {
    //     from: 'dappersdrops@gmail.com', // Sender address
    //     to: 'nathan@airadlabs.com', // List of recipients
    //     subject: 'Node.js Email Test', // Subject line
    //     text: 'Hello from Node.js!', // Plain text body
    //     html: '<b>Hello from Node.js!</b>' // HTML body
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(`Error: ${error}`);
    //     }
    //     console.log(`Message Sent: ${info.response}`);
    // });

});
export {receipt};