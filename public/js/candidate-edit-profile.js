$(document).ready(function () {

    $('#skills').selectpicker();
    $('#languages').selectpicker();

    var workExpBlank = {
        "startDate": "",
        "endDate": "",
        "jobTitle": "",
        "description": "",
        "company": ""
    }

    var educationBlank = {
        "startDate": "",
        "endDate": "",
        "areaOfStudy": "",
        "university": ""
    }

    function setName(fullName) {
        $("#candidate-title").html(fullName)
        $("#full-name").attr("value", fullName)
    }

    function setEmail(email) {
        $("#candidate-title-email").html(email)
        $("#candidate-email").attr("value", email)
    }

    function setBio(bio) {
        $("#bio").html(bio)
    }

    function setCurrentCTC(currentCTC) {
        $("#current-ctc").attr("value", currentCTC)
    }

    function setExpectedCTC(expectedCTC) {
        $("#expected-ctc").attr("value", expectedCTC)
    }

    function setNoticePeriod(noticePeriod) {
        $("#notice-period").attr("value", noticePeriod)
    }

    function setYearsOfExperience(yearsOfExperience) {
        $("#exp-years").attr("value", yearsOfExperience)
    }

    function setSkills(skills) {
        $("#skills").selectpicker('val', skills)
    }

    function setLanguages(languages) {
        $("#languages").selectpicker('val', languages)
    }

    function getConvertedDate(dateToBeConverted) {
        if (dateToBeConverted === '')
            return ''

        var date = new Date(dateToBeConverted)
        var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        return d;
    }

    function setWorkExpObjectToForm(i, workExp) {
        $('#exp-' + i).find('.company').attr('value', workExp.company)
        $('#exp-' + i).find('.job-title').attr('value', workExp.jobTitle)
        $('#exp-' + i).find('.description').html(workExp.description)
        $('#exp-' + i).find('.start-date').attr('value', getConvertedDate(workExp.startDate))
        $('#exp-' + i).find('.end-date').attr('value', getConvertedDate(workExp.endDate))
    }

    function cloneWorkExp(id) {
        var workExpClone = $('.work-exp').clone()
        $(workExpClone).attr('id', 'exp-' + id)
        $(workExpClone).appendTo(".work-exp-container")

        //clear values for the newly cloned work exp
        setWorkExpObjectToForm(id, workExpBlank)

    }

    function setWorkExp(workExp) {
        var i = 0
        for (i; i < workExp.length; i++) {
            if (i > 0) {
                cloneWorkExp(i)
            }
            setWorkExpObjectToForm(i, workExp[i])

        }
    }

    function setEducationObjectToForm(i, education) {
        $('#edu-' + i).find('.study').attr('value', education.areaOfStudy)
        $('#edu-' + i).find('.university').attr('value', education.university)
        $('#edu-' + i).find('.edu-start-date').attr('value', getConvertedDate(education.startDate))
        $('#edu-' + i).find('.edu-end-date').attr('value', getConvertedDate(education.endDate))
    }

    function cloneEducation(id) {
        var educationClone = $('.education').clone()
        $(educationClone).attr('id', 'edu-' + id)
        $(educationClone).appendTo(".education-container")

        //clear values for the newly cloned education
        setEducationObjectToForm(id, educationBlank)

    }

    function setEducation(education) {
        var i = 0
        for (i; i < education.length; i++) {
            if (i > 0) {
                cloneEducation(i)
            }
            setEducationObjectToForm(i, education[i])

        }
    }

    function setOtherProfiles(otherProfiles) {
        $('#hackerrank').attr('value', otherProfiles.hackerrank)
        $('#github').attr('value', otherProfiles.github)
        $('#stackoverflow').attr('value', otherProfiles.stackOverflow)
    }

    function setProfileRating(profileRating) {
        if (profileRating === undefined || profileRating === null || profileRating.length === 0) {
            $('#rating-placeholder').html("Your profile rating will be available soon!")
            $('#rating-placeholder').addClass('alert-warning')
        } else {
            $('#rating-placeholder').html("Profile rating = " + profileRating)
            $('#rating-placeholder').addClass('alert-success')
        }
    }

    function setFormValues(response) {
        setName(response.fullName)
        setBio(response.bio)
        setCurrentCTC(response.currentCTC)
        setExpectedCTC(response.expectedCTC)
        setNoticePeriod(response.noticePeriod)
        setYearsOfExperience(response.yearsOfExperience)
        setSkills(response.skills)
        setLanguages(response.languages)
        setWorkExp(response.workExperience)
        setEducation(response.education)
        setOtherProfiles(response.otherProfiles)
        setProfileRating(response.profileRating)

    }

    function getName() {
        return $("#full-name").val()
    }

    function getBio() {
        return $("#bio").html()
    }

    function getCurrentCTC() {
        return $("#current-ctc").val()
    }

    function getExpectedCTC() {
        return $("#expected-ctc").val()
    }

    function getNoticePeriod() {
        return $("#notice-period").val()
    }

    function getYearsOfExperience() {
        return $("#exp-years").val()
    }

    function getSkills() {
        return $("#skills").val()
    }

    function getLanguages() {
        return $("#languages").val()
    }

    function getWorkExpObjectFromForm(workExpFormObj, workExp) {
        workExp = {}
        var id = $(workExpFormObj).attr('id')
        workExp.company = $('#' + id).find('.company').val()
        workExp.jobTitle = $('#' + id).find('.job-title').val()
        workExp.description = $('#' + id).find('.description').html()
        workExp.startDate = $('#' + id).find('.start-date').val()
        workExp.endDate = $('#' + id).find('.end-date').val()

        return workExp
    }

    function getWorkExp() {
        var workExps = []
        var i = 0
        var workExpFormObj = $('.work-exp-container').find('.work-exp')
        for (i; i < workExpFormObj.length; i++) {
            workExps[i] = getWorkExpObjectFromForm(workExpFormObj[i], workExps[i])
        }
        return workExps
    }

    function getEducationObjectFromForm(educationFormObj, education) {
        education = {}
        var id = $(educationFormObj).attr('id')
        education.areaOfStudy = $('#' + id).find('.study').val()
        education.university = $('#' + id).find('.university').val()
        education.startDate = $('#' + id).find('.edu-start-date').val()
        education.endDate = $('#' + id).find('.edu-end-date').val()

        return education
    }

    function getEducation() {
        var educations = []
        var i = 0
        var educationFormObj = $('.education-container').find('.education')
        for (i; i < educationFormObj.length; i++) {
            educations[i] = getEducationObjectFromForm(educationFormObj[i], educations[i])
        }
        return educations
    }

    function getOtherProfiles() {
        var otherProfiles = {}
        otherProfiles.hackerrank = $('#hackerrank').val()
        otherProfiles.github = $('#github').val()
        otherProfiles.stackOverflow = $('#stackoverflow').val()
        return otherProfiles
    }

    function getDataFromForm(data) {
        data.fullName = getName()
        data.bio = getBio()
        data.currentCTC = getCurrentCTC()
        data.expectedCTC = getExpectedCTC()
        data.noticePeriod = getNoticePeriod()
        data.yearsOfExperience = getYearsOfExperience()
        data.skills = getSkills()
        data.languages = getLanguages()
        data.workExperience = getWorkExp()
        data.education = getEducation()
        data.otherProfiles = getOtherProfiles()
        return data
    }

    function initCandidateEditProfile() {
        var email = $.sessionStorage.get("email")
        jQuery.ajax({
            url: '/candidate/' + email,
            method: 'GET',
            contentType: 'application/json',
            success: function (response) {
                setEmail(email)
                if (response != null) {
                    setFormValues(response)
                }

            },
            error: function (response) {
                alert(response)
            }

        })
    }

    $(document).on('click', '#save-details', function (e) {
        e.preventDefault()
        var sessionKey = $.sessionStorage.get('usersession')
        var email = $.sessionStorage.get('email')
        var data = { "sessionKey": sessionKey, "email": email }
        getDataFromForm(data)
        jQuery.ajax({
            url: '/candidate/',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $('#alert-placeholder').html("Your changes have been saved!")
            },
            error: function (response) {
                $('#alert-placeholder').html(response.message)
            }

        })
    })

    $(document).on('click', '#add-work-exp', function (e) {
        e.preventDefault()
        var workExps = $('.work-exp-container').find('.work-exp')
        var id = $(workExps[workExps.length - 1]).attr('id')
        var num = id.split('-')
        cloneWorkExp(Number(num[1]) + 1)
    })

    $(document).on('click', '#add-education', function (e) {
        e.preventDefault()
        var educations = $('.education-container').find('.education')
        var id = $(educations[educations.length - 1]).attr('id')
        var num = id.split('-')
        cloneEducation(Number(num[1]) + 1)
    })

    initCandidateEditProfile()

})


/*{
    "otherProfiles": {
        "hackerrank": "https://hackerrank.com/saurav94",
        "github": "https://github.com/saurav94",
        "stackOverflow": "https://stackoverflow.com/saurav94"
    },
    "skills": [
        "python",
        "javascript",
        "rest api",
        "mongoDB"
    ],
    "languages": [
        "English"
    ],
    "_id": "5f5e23d31b7f6f1ccf371875",
    "email": "patel.saurav.b@gmail.com",
    "fullName": "Saurav Patel",
    "currentCTC": 11,
    "expectedCTC": 18,
    "noticePeriod": 2,
    "yearsOfExperience": 4,
    "workExperience": [
        {
            "_id": "5f5e23d31b7f6f1ccf371876",
            "startDate": "2016-08-22T00:00:00.000Z",
            "endDate": "2999-12-31T00:00:00.000Z",
            "jobTitle": "Developer",
            "description": "jo lead ne bola wo kiya",
            "company": "SAP"
        }
    ],
    "bio": "Mast aadmi",
    "education": [
        {
            "_id": "5f5e23d31b7f6f1ccf371877",
            "startDate": "2012-05-01T00:00:00.000Z",
            "endDate": "2016-05-01T00:00:00.000Z",
            "areaOfStudy": "yehi to galti kiya sabse bada",
            "university": "Mumbai university"
        }
    ],
    "__v": 0,
    "profileRating": 7.8
}*/