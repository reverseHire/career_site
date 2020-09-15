const express = require('express')
const router = express.Router()

const Candidate = require('../models/Candidate')
const { candidateValidationRules, candidateRatingRule, validate } = require('./candidateValidator.js')


function getCandidateObj(reqObj) {
    const workExperienceObj = []
    const educationObj = []

    for(let i in reqObj.workExperience) {
        let workObj = {}
        workObj.startDate = new Date(reqObj.workExperience[i].startDate)
        workObj.endDate = new Date(reqObj.workExperience[i].endDate)
        workObj.jobTitle = reqObj.workExperience[i].jobTitle
        workObj.description = reqObj.workExperience[i].description
        workObj.company = reqObj.workExperience[i].company
        workExperienceObj.push(workObj)
    }

    for(let i in reqObj.education) {
        let eduObj = {}
        eduObj.startDate = new Date(reqObj.education[i].startDate)
        eduObj.endDate = new Date(reqObj.education[i].endDate)
        eduObj.areaOfStudy = reqObj.education[i].areaOfStudy
        eduObj.university = reqObj.education[i].university
        educationObj.push(eduObj)
    }

    const candidate = {
        email: reqObj.email,
        fullName: reqObj.fullName,
        currentCTC: reqObj.currentCTC,
        expectedCTC: reqObj.expectedCTC,
        noticePeriod: reqObj.noticePeriod,
        skills: reqObj.skills,
        yearsOfExperience: reqObj.yearsOfExperience,
        workExperience: workExperienceObj,
        profileRating: reqObj.profileRating,
        bio: reqObj.bio,
        education: educationObj,
        // achievements: reqObj.achievements,
        languages: reqObj.languages,
        otherProfiles: reqObj.otherProfiles
    }

    return candidate
}

router.get('/', async (req,res) => {
    try {
        const candidate = await Candidate.find()
        res.json(candidate)
    } catch(err) {
        res.json({message: err})
    }
})

router.get('/:email', async (req,res) => {
    try {
        const candidate = await Candidate.findOne({email: req.params.email})
        res.json(candidate)
    } catch(err) {
        res.json({message: err})
    }
})

router.post('/', candidateValidationRules(), validate, async (req,res) => {
    const candidateObj = getCandidateObj(req.body)
    const candidate = new Candidate(candidateObj)
    try {
        const savedCandidate = await candidate.save()
        res.json(savedCandidate)
    } catch(err) {
        res.json({message: err})
    }
    
})

router.put('/:email', candidateValidationRules(), validate, async (req,res) => {
    const candidateObj = getCandidateObj(req.body)
    try {
        const savedCandidate = await Candidate.replaceOne({email: req.params.email}, candidateObj)
        res.json(savedCandidate)
    } catch(err) {
        res.json({message: err})
    }
    
})

// Patch request for updating rating
router.patch('/:email', candidateRatingRule(), validate, async (req,res) => {
    try {
        const savedCandidate = await Candidate.updateOne({email: req.params.email}, {profileRating: req.body.profileRating})
        res.json(savedCandidate)
    } catch(err) {
        res.json({message: err})
    }
    
})

module.exports = router