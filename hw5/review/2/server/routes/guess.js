import express from 'express'
import getNumber from '../core/getNumber'
import {nowtime, log_name} from '../server'

const router = express.Router()

const dir_path = 'server/log/'

var fs = require('fs');

const print_log = (log_infor) => {
  fs.appendFile(dir_path + log_name, log_infor, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Append operation complete.');
  });
}

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  getNumber(true)
  const start_log = 'start number=' + getNumber() + " " + nowtime(false) + "\n"
  print_log(start_log)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  const guess_log = 'guess ' + guessed + " " + nowtime(false) + "\n"
  print_log(guess_log)
  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(number === guessed){
      res.status(201).send({ msg: 'Equal'})
      const end_log = "end-game" + "\n"
      print_log(end_log)
    }
    else{
      if(number > guessed){
        res.status(201).send({ msg: 'Bigger'})
      }
      else{
        res.status(201).send({ msg: 'Smaller'})
      }
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)
  const restart_log = 'restart number=' + getNumber() + " " + nowtime(false) + "\n"
  print_log(restart_log)
  res.json({ msg: 'The game has restarted.' })
})
export default router
