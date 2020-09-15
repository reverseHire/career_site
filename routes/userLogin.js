const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const userLoginRule = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('userType').isIn(["C","R"])
    ]
}

const userUpdatePasswordRule = () => {
    return [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('oldPassword').isLength({ min: 8 }),
        body('userType').isIn(["C","R"])
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

router.post("/register", userLoginRule(), validate, async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email, userType: req.body.userType }).exec();
        if(user) {
            return res.status(400).json({ message: `The user ${req.body.email} already exists` });
        }

        console.log("User does not exist")
        
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