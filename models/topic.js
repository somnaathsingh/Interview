const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://somnath:test1234@cluster0.cjqp3.mongodb.net/node-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
const Schema=mongoose.Schema;

const topicSchema= new mongoose.Schema({
    topic:{
        type: String,
        unique:true
    }
    
}); 


const Topic= mongoose.model('topic',topicSchema);
module.exports=Topic;