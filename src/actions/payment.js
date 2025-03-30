'use strict';
// solana pay payments
import {rpc,treasury,fee} from '../config.js';
import {Connection,PublicKey} from '@solana/web3.js';
import mcswap from 'mcswap-sdk';
import Express from 'express';
import fs from 'fs';
const payment = Express.Router();
const SOLANA_CONNECTION = new Connection(rpc,"confirmed");
payment.get('/payment/:format/:escrow/:reference',async(req,res)=>{
    const _format_ = req.params.format;
    const format = _format_.toLowerCase();
    const _escrow_ = req.params.escrow;
    const reference = req.params.reference;
    const request = {
        "rpc":rpc,
        "display":true,
        "standard":format,
        "escrow":_escrow_,
    };
    const escrow = await mcswap.fetch(request);
    if(escrow.status=="error"){
        escrow.message = "Invalid Listing ID";
        res.status(400).json(escrow);
    }
    else{
        try{
            const response = await fetch(rpc,{method:'POST',headers:{"Content-Type":"application/json"},
            body:JSON.stringify({"jsonrpc":"2.0","id":"listing","method":"getAsset","params":{"id":escrow.sellerMint}})});
            const meta_data = await response.json();
            const name = meta_data.result.content.metadata.name;
            const image = meta_data.result.content.links.image;
            const obj = {}
            obj.label = "Purchase "+_format_+" "+name;
            obj.icon = image;
            const time = Date.now();
            try{
                const temp_file = '/tmp/'+reference+'.txt';
                fs.writeFileSync(temp_file,time.toString());
                res.status(200).json(obj);
            }
            catch(err){
                res.status(400).json(err);
            }
        }
        catch(err){
            res.status(400).json(err);
        }
    }
});
payment.route('/payment/:format/:escrow/:reference').post(async(req,res)=>{
    try{
        const buyer  = req.body?.account;
        const reference = req.params.reference;
        if(!buyer)throw new Error('missing account');
        let format = req.params.format;
        format = format.toLowerCase();
        let transaction;
        if(format=="spl"){
            const escrow = req.params.escrow;
            const _transaction_ = {
                rpc: rpc,
                blink: true,
                convert: true,
                affiliateWallet: treasury,
                affiliateFee: fee,
                buyer: buyer,
                escrow: escrow,
                memo: reference
            }
            transaction=await mcswap.splExecute(_transaction_).catch(function(err){});
        }
        else{
            const escrow = req.params.escrow;
            const state = await SOLANA_CONNECTION.getAccountInfo(new PublicKey(escrow)).catch(function(error){});
            const encoded = state.data;
            let decoded;
            let mint;
            if(format=="nft"){
                decoded = mcswap.NFT_SWAP_STATE.decode(encoded);
                mint = new PublicKey(decoded.initializer_mint).toString();
            }
            else if(format=="pnft"){
                decoded = mcswap.PNFT_SWAP_STATE.decode(encoded);
                mint = new PublicKey(decoded.initializer_mint).toString();
            }
            else if(format=="cnft"){
                decoded = mcswap.CNFT_SWAP_STATE.decode(encoded);
                mint = new PublicKey(decoded.asset_id).toString();
            }
            else if(format=="core"){
                decoded = mcswap.CORE_SWAP_STATE.decode(encoded);
                mint = new PublicKey(decoded.initializer_asset).toString();
            }
            const _transaction_ = {
                rpc: rpc,
                blink: true,
                convert: true,
                affiliateWallet: treasury,
                affiliateFee: fee,
                buyer: buyer,
                sellerMint: mint,
                memo: reference
            }
            if(format=="nft"){
                transaction=await mcswap.nftExecute(_transaction_).catch(function(err){});
            }
            else if(format=="cnft"){
                transaction=await mcswap.cnftExecute(_transaction_).catch(function(err){});
            }
            else if(format=="pnft"){
                transaction=await mcswap.pnftExecute(_transaction_).catch(function(err){});
            }
            else if(format=="core"){
                transaction=await mcswap.coreExecute(_transaction_).catch(function(err){});
            }
            res.status(200).json(transaction);
        }
    }
    catch(err){
        const _err_ = {};
        _err_.status="error";
        _err_.message="error";
        _err_.err=err;
        res.status(400).json(_err_);
    }
});
export {payment};