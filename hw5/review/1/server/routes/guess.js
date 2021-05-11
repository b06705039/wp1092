import express from 'express'
import getNumber from '../core/getNumber'
import moment from 'moment'


const router = express.Router()

let logMsg = ''
var fs = require('fs')
var path = require('path')

const logfilename = moment().format(('YYYY-MM-DD-HH-mm'))
fs.mkdir(path.join(__dirname, '../log'),{recursive:true}, (err)=>{if (err) console.log(err)})
var LogStream = fs.createWriteStream(path.join(__dirname, '../log', `${logfilename}.log`), { flags: 'w' })

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// nothing needed to do here, just getNumber to set a number.
router.post('/start', (_, res) => {
  const logTime = moment().format(('YYYY-MM-DD-HH-mm-ss'))
  getNumber(true)
  logMsg = `start number=${getNumber()} ` + logTime +`\n`
  LogStream.write(logMsg)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  //console.log(`number:${number}`, `guessed:${guessed}`)
  const logTime = moment().format(('YYYY-MM-DD-HH-mm-ss'))


  if (guessed !== 0 && !guessed) {
    console.log('No number provided.')
    res.status(500).send({ msg: 'No number provided.' })
    logMsg = `guess No number provided ` + logTime +`\n`
    LogStream.write(logMsg)
  }
  // TODO: checked if number and guessed are the same, response with some hint
  if (guessed <= 0 || guessed > 100) {
    res.status(400).send({ msg: `Error: ${guessed} is not a valid number (1 - 100) ` })
    logMsg = `guess invalid ` + logTime +`\n`
    LogStream.write(logMsg)
  }
  else {
    logMsg = `guess ${guessed} ` + logTime +`\n`
    LogStream.write(logMsg)
    if (guessed < number) {
      res.status(200).send({ msg: 'Bigger' })
    }
    else if (guessed > number) {
      res.status(200).send({ msg: 'Smaller' })
    }
    else if (guessed === number) {
      res.status(200).send({ msg: 'Equal' })
      logMsg = `end-game`+`\n`
      LogStream.write(logMsg)      
    }
  }

})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)
  const logTime = moment().format(('YYYY-MM-DD-HH-mm-ss'))
  res.json({ msg: 'The game has restarted.' })
  logMsg = `restart number=${getNumber()} ` + logTime +`\n`
  LogStream.write(logMsg)
})

export default router
