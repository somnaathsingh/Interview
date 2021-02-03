const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://somnath:test1234@cluster0.cjqp3.mongodb.net/node-auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
const Schema = mongoose.Schema;
const companySchema= new mongoose.Schema({
    imag:{
        data: Buffer,
        contentType: String,
        required: false,
   },
   company:{
    type: String,
    required: false,
}
});
const Company= mongoose.model('company',companySchema);
module.exports=Company;