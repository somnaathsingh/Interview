const AdminBro = require('admin-bro')
const Question = require('../models/question')
const Topic = require('../models/topic')
const Interview = require('../models/interviewexp')
const Company = require('../models/company')
const options = {
    resources : [Question,Topic,Interview,Company]
};

module.exports = options;