const { Router } = require('express');
const authController = require('../controllers/authController')
const practicecontroller = require('../controllers/practicecontroller')
const Topic = require('../models/topic')
const Interview = require('../models/interviewexp')
const Question = require('../models/question');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const Company = require('../models/company')
const User = require('../models/User')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path');
var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });


const router = Router();
const AdminEmails= ['somnaath@google.com'];

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/practice/:topic', requireAuth ,practicecontroller.questions);
router.get('/addQuestion',requireAuth,practicecontroller.addQuestion_get);
router.post('/addQuestion',requireAuth,practicecontroller.addQuestion_post);
router.get('/interviewExperience',requireAuth ,function(req,res){
  Company.find({},function (err,docs){
    if (err) throw err;
    else res.render('company',{reports: docs});
});
});
router.get('/interviewExperience/:company', requireAuth ,practicecontroller.interviewExperience_get);
router.get('/interviewExperience/:company/:name', requireAuth ,practicecontroller.name_get);
router.post('/practice',practicecontroller.addTopic_post);
router.post('/addCompany',requireAuth , upload.single('imag'),(req, res, next) => {
  var name= req.body.company;
  if (name!='')
  {

 
  var obj2 = {
    company: req.body.company,
    imag:{
      data: fs.readFileSync(path.join('C:/Users/somna/Documents/noejs/nojs/public/' + req.file.filename)),
      contentType: 'image/png'
    },
  } 
  Company.create(obj2, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        res.redirect('/addExperience')
    }
  
});
  }
  else
  {
    res.redirect('/addExperience')
  }
});
router.post('/addExperience',requireAuth , upload.single('image'),(req, res, next) => {
  var obj = {
    name: req.body.name,
    year: req.body.year,
    college: req.body.college,
    description: req.body.description,
    company: req.body.company,
    img: {
      data: fs.readFileSync(path.join('C:/Users/somna/Documents/noejs/nojs/public/' + req.file.filename)),
          contentType: 'image/png'
    },
  } 
  Interview.create(obj, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        res.redirect('/interviewExperience');
    }
});
});
router.get('/practice',requireAuth ,practicecontroller.practice_get);
router.get('/addCompany',requireAuth ,practicecontroller.addCompany_get);
router.get('/addExperience',requireAuth ,practicecontroller.addExperience_get);
module.exports = router;