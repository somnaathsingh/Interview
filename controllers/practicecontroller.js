const Topic = require('../models/topic')
const Question = require('../models/question')
const Interview = require('../models/interviewexp')
const Company = require('../models/company')

module.exports.questions=(req,res)=>{
    const topic=req.params.topic;
    var a=[];
    Question.find()
    .populate('topic')
    .exec(function (err, topics) {
        if (err) return handleError(err);
        else{
          topics.forEach(element => {
            if(element.topic.topic===topic && element.display===true)
            {
              a.push(element);
            }
          });
        }
        res.render('questions',{title: topic, questions:a})
    });
}
module.exports.addQuestion_get=(req,res)=>{
  Topic.find()
  .then(result=>{
      res.render('addQuestion',{topics: result});
  })
  .catch(err=>{
        console.log(err);
  });
}
module.exports.addTopic_post = (req,res,next) => {
  
     var obj5={
       topic:req.body.topic,
     }
     Topic.create(obj5, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/addQuestion');
      }
  });
    
} 
module.exports.addQuestion_post= (req,res,next)=>{
  var obj4={
    question: req.body.question,
    link: req.body.link,
    topic: req.body.topic,
    display:false,
  }
  Question.create(obj4, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        // item.save();
        res.redirect('/practice');
    }
});
  }

    module.exports.interviewExperience_get=(req,res)=>{
      const company = req.params.company;
      var a=[];
      Interview.find()
      .populate('company')
      .exec(function (err, companies) {
          if (err) return handleError(err);
          else{
            companies.forEach(element => {
              if(element.company.company=== company && element.display===true)
              {
                a.push(element);
              }
            });
          }
          res.render('interviewExp',{title:company, items:a,})
      });
    }
    module.exports.name_get = (req,res)=>{
      const company = req.params.company;
      const name= req.params.name;
      var a=[];
      Interview.find()
      .exec(function (err, topics) {
          if (err) return handleError(err);
          else{
            topics.forEach(element => {
              if(element.name === name&& element.display===true)
              {
                a.push(element);
              }
            });
          }
          res.render('intername',{ title :company,questions:a})
      });
    }
    module.exports.addCompany_get = (req,res)=>{
      Company.find({},function (err,docs){
        if (err) throw err;
        else res.render('addCompany',{reports: docs});
    });
    }
    module.exports.practice_get = (req,res)=>{
      Topic.find({},function (err,docs){
        if (err) throw err;
        else res.render('practice',{reports: docs});
    });
    }
    module.exports.addExperience_get = (req,res)=>{
      Company.find({},function (err,docs){
        if (err) throw err;
        else res.render('addExperience',{reports: docs});
    });
    }