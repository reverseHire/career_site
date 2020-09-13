const mongoose = require('mongoose');

const CandidateSchema = mongoose.Schema({
    userName: {type: String, required: true},
    fullName: {type: String, required: true},
    currentCTC: {type: Number},
    expectedCTC: {type: Number},
    noticePeriod: {type: Number, required: true},
    skills: [{type: String, required: true}],
    yearsOfExperience: {type: Number, required: true},
    workExperience: [{
        startDate: {type: Date},
        endDate: {type: Date},
        jobTitle: {type: String},
        description: {type: String},
        company: {type: String}
    }],
    profileRating: {type: Number},
    bio: {type: String},
    education: [{
        startDate: {type: Date},
        endDate: {type: Date},
        areaOfStudy: {type: String},
        university: {type: String}
    }],
    // achievements: {},
    languages: [{type: String}],
    otherProfiles: {
        hackerrank: {type: String},
        github: {type: String},
        stackOverflow: {type: String}
    }
  }
);

//Export model
module.exports = mongoose.model('Candidates', CandidateSchema);