const express = require('express')
const router = express.Router()

const Candidate = require('../models/Candidate')

function getCandidateObj(req) {
    const workExperienceObj = []
    const educationObj = []

    for(let i in req.body.workExperience) {
        let workObj = {}
        workObj.startDate = new Date(req.body.workExperience[i].startDate)
        workObj.endDate = new Date(req.body.workExperience[i].endDate)
        workObj.jobTitle = req.body.workExperience[i].jobTitle
        workObj.description = req.body.workExperience[i].description
        workObj.company = req.body.workExperience[i].company
        workExperienceObj.push(workObj)
    }

    for(let i in req.body.education) {
        let eduObj = {}
        eduObj.startDate = new Date(req.body.education[i].startDate)
        eduObj.endDate = new Date(req.body.education[i].endDate)
        eduObj.areaOfStudy = req.body.education[i].areaOfStudy
        eduObj.university = req.body.education[i].university
        educationObj.push(eduObj)
    }

    const candidate = {
        userName: req.body.userName,
        fullName: req.body.fullName,
        currentCTC: req.body.currentCTC,
        expectedCTC: req.body.expectedCTC,
        noticePeriod: req.body.noticePeriod,
        skills: req.body.skills,
        yearsOfExperience: req.body.yearsOfExperience,
        workExperience: workExperienceObj,
        profileRating: req.body.profileRating,
        bio: req.body.bio,
        education: educationObj,
        // achievements: req.body.achievements,
        languages: req.body.languages,
        otherProfiles: req.body.otherProfiles
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

router.get('/:userName', async (req,res) => {
    const candidateUserName = req.params.userName
    try {
        const candidate = await Candidate.find({userName: candidateUserName})
        res.json(candidate)
    } catch(err) {
        res.json({message: err})
    }
})

router.post('/', async (req,res) => {
    const candidateObj = getCandidateObj(req)
    const candidate = new Candidate(candidateObj)
    try {
        const savedCandidate = await candidate.save()
        res.json(savedCandidate)
    } catch(err) {
        res.json({message: err})
    }
    
})

// router.patch('/:userName', async (req,res) => {
//     const candidateUserName = req.params.userName
//     const candidate = getCandidateObj(req)
//     try {
//         const savedCandidate = await candidate.updateOne({userName: candidateUserName}, candidate)
//         res.json(savedCandidate)
//     } catch(err) {
//         res.json({message: err})
//     }
    
// })

router.put('/:userName', async (req,res) => {
    const candidateObj = getCandidateObj(req)
    const candidate = new Candidate(candidateObj)
    try {
        const savedCandidate = await candidate.findOneAndReplace({userName: req.params.userName}, candidateObj)
        res.json(savedCandidate)
    } catch(err) {
        res.json({message: err})
    }
    
})

module.exports = router