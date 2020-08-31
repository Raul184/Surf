// Using mongoose to plug in my DB
const mongoose = require('mongoose');

const db = () => {
  try {
    mongoose.connect(process.env.URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Mongo DB connected')  
  } 
  catch (err) {
    console.log('Error on DB Connection')
    console.log(err.message)
  }
}

module.exports = db;
