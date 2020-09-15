const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const userLoginRule = () => {
    return [
        body('username').isString(),
        body('password').isLength({ min: 8 }),
        body('userType').isIn(["C","R"])
    ]
}

const userUpdatePasswordRule = () => {
    return [
        body('username').isString(),
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
        var user = new User(req.body);
        var result = await user.save();
        res.json(result);
    } catch (err) {
        res.status(500).json({message: err});
    }
});

// Ask for old password and then update new password
router.put("/updatePassword", userUpdatePasswordRule(), validate, async (req, res) => {
    try {
        var user = await User.findOne({ username: req.body.username, userType: req.body.userType }).exec();
        if(!user) {
            return res.status(400).json({ message: "The username does not exist" });
        }
        if(!user.comparePassword(req.body.oldPassword)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }
        console.log("Password matched")
        // Old password is correct, update the password now
        // var user1 = new User(req.body);
        // console.log(user)
        user.updatePassword()
        // user.password = req.body.password
        // console.log(user)
        
        var result = await User.updateOne({ username: req.body.username, userType: req.body.userType }, {password: user.password});
        res.json(result);

    } catch (err) {
        res.status(500).json({message: err});
    }
});

router.post("/login", userLoginRule(), validate ,async (req, res) => {
    try {
        var user = await User.findOne({ username: req.body.username, userType: req.body.userType }).exec();
        if(!user) {
            return res.status(400).json({ message: "The username does not exist" });
        }
        // user.comparePassword(req.body.password, (err, match) => {
        if(!user.comparePassword(req.body.password)) {
            return res.status(400).json({ message: "The password is incorrect" });
        }
        res.json({ message: "The username and password combination is correct!" });
    } catch (err) {
        res.status(500).json({message: err});
    }
});

module.exports = router