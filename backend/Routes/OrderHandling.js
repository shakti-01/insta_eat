const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post("/place_order",async (req,res)=>{
    try{
        const email = req.body.email;
        const order_data = req.body.order_data;
        const order_date = req.body.order_date;
        await Order.create({
            email: email,
            order_data:order_data,
            order_date : order_date
        }).then(() => {
            res.json({ success: true })
        }).catch((e)=>{
            console.log(e)
            res.status(400).json({success:false})
        })
        //res.status(200).json({success: true});
    }
    catch(err){
        res.status(400).json({success: false});
        console.log(err);
    }
});

router.post("/get_orders",async (req,res)=>{
    try{
        const email = req.body.email;
        const orders = await Order.find({email:email});
        res.status(200).json({success:true, "orders": orders});
    }
    catch(err){
        res.status(400).json({success: false});
        console.log(err);
    }
});

module.exports = router;