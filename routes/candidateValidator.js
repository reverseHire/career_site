const { body, validationResult } = require('express-validator')

const candidateValidationRules = () => {
    return [
        body('userName').notEmpty().isString(),
        body('fullName').notEmpty().isString(),
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
    validate,
}