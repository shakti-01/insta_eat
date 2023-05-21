const express = require('express');
const router = express.Router();

router.post("/food_items",async (req,res)=>{
    try{
        const food_items = global.food_items;
        res.status(200).json({success: true, food_items : food_items, food_category: global.food_category});
    }
    catch(err){
        res.status(400).json({success: false});
        console.log(err);
    }
});

module.exports = router;