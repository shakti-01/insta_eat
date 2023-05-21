const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "This-Is-A-Secret-!This-can-be-any-text!";

router.post("/createuser", [
    body('email', 'not proper email').isEmail(),
    body('name', 'invalid name').isLength({ min: 5 }),
    body('password', 'invalid password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let securedPass = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                password: securedPass,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            res.json({ success: false });
            console.log(error);
        }
    }
)

router.post("/loginuser",
    async (req, res) => {
        try {
            let ud = await User.findOne({email:req.body.email});
            if(!ud){
                res.status(400).json({error: "Use correct credentials"});
            }
            const correctPass = await bcrypt.compare(req.body.password, ud.password);
            if(!correctPass ){
                res.status(400).json({error: "Use correct credentials"});
            }
            const data = {
                user:{
                    id: ud.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            res.status(200).json({success: true, authToken: authToken});
        } catch (error) {
            res.json({ success: false });
            console.log(error);
        }
    }
)

module.exports = router;