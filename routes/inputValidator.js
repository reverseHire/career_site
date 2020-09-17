const { body, validationResult } = require('express-validator')

const candidateValidationRules = () => {
    return [
        body('email').notEmpty().withMessage('Must contain email').isEmail().withMessage('Not a valid email id'),
        body('fullName').notEmpty().withMessage('Must contain full name').isString(),
        body('currentCTC').optional().isFloat(),
        body('expectedCTC').optional().isFloat(),
        body('noticePeriod').isInt({ min: 0, max: 4 }),
        body('skills').notEmpty().isArray(),
        body('yearsOfExperience').notEmpty().isInt({ min: 0, max: 100 }),
        body('workExperience').optional().isArray(),
        body('workExperience.*.startDate').optional().isDate(),
        body('workExperience.*.endDate').optional().isDate(),
        body('workExperience.*.jobTitle').optional().isString(),
        body('workExperience.*.description').optional().isString(),
        body('workExperience.*.company').optional().isString(),
        body('profileRating').optional().isFloat({ min: 0.0, max: 10.0 }),
        body('bio').optional().isString(),
        body('education').optional().isArray(),
        body('education.*.startDate').optional().isDate(),
        body('education.*.endDate').optional().isDate(),
        body('education.*.areaOfStudy').optional().isString(),
        body('education.*.university').optional().isString(),
        // achievements,
        body('languages').optional().isArray(),
        body('otherProfiles.hackerrank').optional().isURL(),
        body('otherProfiles.github').optional().isURL(),
        body('otherProfiles.stackOverflow').optional().isURL()
    ]
}

const candidateRatingRule = () => {
    return [
        body('profileRating').exists().isFloat({ min: 0.0, max: 10.0 }),
    ]
}

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

const hackerrankDataRule = () => {
    return [
        body('username').isString(),
        body('algorithmRating').optional().isFloat({ max: 3000 }),
        body('averageContestRank').optional().isFloat({min: 0, max: 100 }),
        body('percentile').optional().isFloat({min: 0, max: 100 }),
        body('practiceProblemScores').optional().isArray(),
        body('practiceProblemScores.*.topic').optional().isString(),
        body('practiceProblemScores.*.score').optional().isFloat({min: 0, max: 100 })
    ]
}

const githubDataRule = () => {
    return [
        body('username').isString(),
        body('repositories').optional().isFloat(),
        body('totalContributions').optional().isInt(),
        body('monthlyAverageContributions').optional().isFloat()
    ]
}

const stackoverflowDataRule = () => {
    return [
        body('username').isString(),
        body('questions').optional().isInt(),
        body('answers').optional().isInt(),
        body('reputation').optional().isInt(),
        body('badge.gold').optional().isInt(),
        body('badge.silver').optional().isInt(),
        body('badge.bronze').optional().isInt(),
        body('tags').optional().isArray(),
        body('tags.*.topic').optional().isString(),
        body('tags.*.score').optional().isInt(),
        body('tags.*.posts').optional().isInt()
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

module.exports = {
    candidateValidationRules,
    candidateRatingRule,
    userLoginRule,
    userUpdatePasswordRule,
    hackerrankDataRule,
    githubDataRule,
    stackoverflowDataRule,
    validate
}