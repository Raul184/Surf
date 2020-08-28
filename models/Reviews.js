const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reviewsSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String
})


module.exports = mongoose.model('User', reviewsSchema)