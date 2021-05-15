import mongoose from 'mongoose';

const Schema = mongoose.Schema

const socreCardSchema = new Schema({
  name: String,
  subject: String,
  score: Number
  
})

// const socreCardSchema = new Schema({
//   name: {
//     type: String,
//     required: [true, 'Name field is required.']
//   },
//   subject: {
//     type: String,
//     required: [true, 'subject field is required.']
//   },
//   score: {
//     type: Number,
//     required: [true, 'score field is required.']
//   },
// })


const ScoreCard = mongoose.model('scoreCard', socreCardSchema)

export default ScoreCard;







 