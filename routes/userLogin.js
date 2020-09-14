const express = require('express')
const router = express.Router()

const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const userLoginRule = () => {
    return [
        body('username').isString(),
        body('password').isLength({ min: 7 })
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

router.post("/login", userLoginRule(), validate ,async (req, res) => {
    try {
        var user = await User.findOne({ username: req.body.username }).exec();
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