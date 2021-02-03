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
module.exports.addQuestion_post= async(req,res)=>{
  const {question,topic,newTopic,link}=req.body;
    try{
      var ques;
        if(topic!="1"){
          ques= new Question({question:question,link:link,topic:topic,display:false});
          const resp=await ques.save();
        }
        else{
          const t=await Topic.create({topic:newTopic});
          ques= new Question({question:question,link:link,topic:t._id,display:false});
          const resp=await ques.save();
        }
      res.status(201).json({ques:ques._id});
      
    }
    catch(err){
      const errors=errorHandler(err);
      
      //console.log(err);
      res.status(400).json({errors});
    }}
    module.exports.interviewExperience_get=(req,res)=>{
      Interview.find()
      .then(result=>{
          res.render('company',{items: result});
      })
      .catch(err=>{
            console.log(err);
      });
    }
    module.exports.addtopic_post = async(req,res) => {
      const {topic,compu}=req.body;
      try
      {
        var tops;
        if(compu==""){
          topic= new Topic({topic:topic});
          const resp=await tops.save();
        }
        res.status(201).json({tops:tops._id});
      }
    catch(err){
      console.log(err);
    }}