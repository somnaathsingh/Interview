const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const buildAdminRouter = require('./admin/admin_router')
const options = require('./admin/admin_options')
const app= express()
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(cookieParser());

AdminBro.registerAdapter(AdminBroMongoose);



// view engine
app.set('view engine', 'ejs');
const ADMIN = {
  email:'somnaath@google.com',
  password:'Somnaathyes',
}
module.exports = ADMIN;

// database connection
const run = async() => {

const dbURI = 'mongodb+srv://somnath:test1234@cluster0.cjqp3.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{
    console.log('connected');
     app.listen(8001);
     const admin = new AdminBro(options);
     const router = AdminBroExpress.buildAuthenticatedRouter(admin,{
       cookieName: 'admin-bro',
       cookiePassword: 'Hellyeah@123',
       authenticate: async (email, password) =>{
         if (email===ADMIN.email && password=== ADMIN.password){
           return ADMIN
         }
         return null
       }
     });
     app.use(admin.options.rootPath, router);

  })

  .catch((err) => console.log(err));
};
run();
 


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));

app.use(authRoutes);