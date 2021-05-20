import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = parseInt(req.body.score, 10);
    
    const existing = await ScoreCard.exists({ name, subject });

    const query = { name, subject };
    const update = { score };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const card = await ScoreCard.findOneAndUpdate(query, update, options);

    let message;
    if (existing) {
      message=`Updating (${name}, ${subject}, ${score})`;
    } else {
      message=`Adding (${name}, ${subject}, ${score})`;
    }
    res.send({card, message});
  } catch (e) {
    res.json({ message: 'Something went wrong...' + e });
  }
});

router.delete('/db', async function (req, res) {
  try {
    await ScoreCard.deleteMany();
    console.log("delete the collection of the DB");
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

const parseScore = (compare, num) => {
  num = parseInt(num, 10);
  //console.log("PARSE"+compare+ num)
  let q;
  switch (compare) {
    case '=':
      q =  { score: num };
      break;
    case '>=':
      q =  { score: { $gte: num } };
      break;
    case '<=':
      q =  { score: { $lte: num } };
      break;
    case '>':
      q =  { score: { $gt: num } };
      break;
    case '<':
      q =  { score: { $lt: num } };
      break;
    default:
      q =  { score: num };
      break;
  }
  return q;
}

router.get('/cards', async function (req, res) {
  try {
    const qType = req.query.queryType;
    const qString = req.query.queryString;
    const qCompare = req.query.queryCompare;
    const qSortBy = req.query.querySortBy;

    let q
    if (qType === 'score') {
      q = parseScore(qCompare, qString)
    } else {
      q = { [qType]: qString }
    }

    let arr;
    if (qSortBy !== 'default') {
      arr = await ScoreCard.find(q).sort({[qSortBy]: 1}).exec();
    } else {
      arr = await ScoreCard.find(q).exec();
    }

    if (arr.length) {
      let messages = [];
      messages.push(`Found ${arr.length} results!`)
      arr.forEach((e, i) => {messages.push(`${i} (${e.name}, ${e.subject}, ${e.score})`)});
      res.send({ messages });
    } else {
      res.send({ messages: [`${qType} (${qType === 'score' ? qCompare : ''}${qString}) not found!`] });
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});



router.get('/cards-advanced', async function (req, res) {
  try {
    const qType1 = req.query.queryType1;
    const qString1 = req.query.queryString1;
    const qCompare1 = req.query.queryCompare1;
    const qType2 = req.query.queryType2;
    const qString2 = req.query.queryString2;
    const qCompare2 = req.query.queryCompare2;
    const qAndOr = req.query.queryAndOr;
    const qSortBy = req.query.querySortBy;

    let q, q1, q2;
    
    if (qType1 === 'score') {
      q1 = parseScore(qCompare1, qString1)
    } else {
      q1 = { [qType1]: qString1 }
    }

    if (qType2 === 'score') {
      q2 = parseScore(qCompare2, qString2)
    } else {
      q2 = { [qType2]: qString2 }
    }

    if (qAndOr === 'or') {
      q = ({ $or: [q1, q2] });
    } else if (qAndOr === 'and') {
      q = ({ $and: [q1, q2] });
    }

    let arr;
    if (qSortBy !== 'default') {
      arr = await ScoreCard.find(q).sort({[qSortBy]: 1}).exec();
    } else {
      arr = await ScoreCard.find(q).exec();
    }

    if (arr.length) {
      let messages = [];
      messages.push(`Found ${arr.length} results!`)
      arr.forEach((e, i) => {messages.push(`${i} (${e.name}, ${e.subject}, ${e.score})`)});
      res.send({ messages });
    } else {
      res.send({ messages: [`${qType} (${qString}) not found!`] });
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

export default router;
