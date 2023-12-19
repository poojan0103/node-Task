const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const signuproutes = require('./routes/SignupRoutes');
const schoolroutes = require('./routes/SchoolRoutes');
const Classroutes = require('./routes/ClassRoutes');
const Studentroutes = require('./routes/Studentroutes');
const roleroutes = require('./routes/Roleroutes')
app.use(express.json());
// app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use(signuproutes);
app.use(schoolroutes);
app.use(Classroutes);
app.use(Studentroutes);
app.use(roleroutes);
app.use('/uploads', express.static('uploads'));
mongoose.connect('mongodb://127.0.0.1:27017/Task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})