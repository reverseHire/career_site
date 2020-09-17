const express = require('express')
const router = express.Router()

const User = require('../models/User');
const { userLoginRule, userUpdatePasswordRule, validate } = require('./inputValidator');

router.post("/register", userLoginRule(), validate, async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if(user) {
            return res.status(400).json({ message: `The user ${req.body.email} already exists` });
        }
        
        var userNew = new User(req.body);
        var result = await userNew.save();
        res.json({ message: `User ${req.body.email} registered` });
    } catch (err) {
        res.status(500).json({message: err});
    }
});

// Ask for old password and then update new password
router.put("/updatePassword", userUpdatePasswordRule(), validate, async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if(!user) {
            return res.status(400).json({ message: `The user ${req.body.email} does not exist` });
        }
        if(!user.comparePassword(req.body.oldPassword)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }

        // Old password is correct, delete the record and create a new one
        var result = await User.deleteOne({ email: req.body.email, userType: req.body.userType });

        var userNew = new User(req.body);
        var result = await userNew.save();
        
        res.json({ message: `Password of User ${req.body.email} changed successfully` });

    } catch (err) {
        res.status(500).json({message: err});
    }
});

router.post("/login", userLoginRule(), validate ,async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if(!user) {
            return res.status(400).json({ message: `The user ${req.body.email} does not exist` });
        }
        // user.comparePassword(req.body.password, (err, match) => {
        if(!user.comparePassword(req.body.password)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }
        res.json({ message: "Login Succeeded!" });
    } catch (err) {
        res.status(500).json({message: err});
    }
});

module.exports = router