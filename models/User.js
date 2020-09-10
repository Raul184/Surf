const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: String,
  image: String,
  // posts: [
  //   { 
  //     type: Schema.Types.ObjectId,
  //     ref: 'Post'
  //   }
  // ]
})
usersSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User' , usersSchema)