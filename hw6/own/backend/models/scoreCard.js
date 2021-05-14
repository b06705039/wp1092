import mongoose from 'mongoose';

const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const socreCardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  subject: {
    type: String,
    required: [true, 'Subject field is required.']
  },
  score: {
    type: Number,
    required: [ true, 'Score field is required']
  }
})

// Creating a table within database with the defined schema
const ScoreCard = mongoose.model('scoreCard', MessageSchema)

// Exporting table for querying and mutating
export default ScoreCard;

// module.exports = Message
