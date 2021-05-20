// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const scoreCardSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
});

const ScoreCard = mongoose.model('ScoreCard', scoreCardSchema);

export default ScoreCard;
