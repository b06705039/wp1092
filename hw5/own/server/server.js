import express from 'express'
import cors from 'cors'
import path from 'path'
import guessRoute from './routes/guess.js'
import fs from 'fs'
import logger from 'morgan'





const isProduction = process.env.NODE_ENV === 'production'

const app = express()

var accessLogStream = fs.createWriteStream(path.join('./server/log/', 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))
// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})
// app.use(morgan('dev'))


// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
