const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://somnath:test1234@cluster0.cjqp3.mongodb.net/node-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
const Schema=mongoose.Schema;

const questionSchema= new mongoose.Schema({
    question:{
        type: String,
        required:true,
    },
    link:{
        type: String,
        required:true,
        unique:true
    },
    topic:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'topic'
    },
    display:{
        type: Boolean,
        default:false

    }
    
}); 

const Question= mongoose.model('question',questionSchema);

module.exports=Question;