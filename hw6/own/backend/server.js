import express from 'express'
import cors from 'cors'
import dataTransRoute from './routes/dataTrans.js'
import mongoose from 'mongoose'
// import dotenv from 'dotenv-defaults'



// dotenv.config()

const app = express()
const port = process.env.REACT_APP_PORT || 4000



app.use(cors())
app.use(express.json())

app.use(dataTransRoute)
app.listen(port, () => {
  
  console.log(`in server.js ${port}.`)

})


mongoose.connect("mongodb+srv://eva:78945612330@cluster0.51a4s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res) => console.log("mongo db connection created"));