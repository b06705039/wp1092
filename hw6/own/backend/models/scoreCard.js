import mongoose from 'mongoose';

const Schema = mongoose.Schema

const socreCardSchema = new Schema({
  name: String,
  subject: String,
  score: Number
  
})


const ScoreCard = mongoose.model('scoreCard', socreCardSchema)

export default ScoreCard;







 