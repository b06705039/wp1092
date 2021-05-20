import express from 'express'
import mongoose from 'mongoose'
import { deleteAll, addData, query } from '../models/scoreCardMethod.js'

const router = express.Router()
const db = mongoose.connection;

db.on("error", (err) => console.log(err));


router.post('/add', async( req, res ) => {

    const { username, subject, score } = req.body

    console.log("in routes add req: ", username, subject, score)
    try{
        await addData(username, subject, score)
        res.send({msg: "in dataTrans add, success"})
    }catch{
        res.send({msg: "in dataTrans add, fail"})
    }
    
    
})

router.delete('/delete', async( req, res) => {
    console.log("in routes delete")
    try{
        await deleteAll()
        res.send({msg: "in dataTrans, delete success"})
    }catch{
        res.send({msg: "in dataTrans, delete fail "})
    }
    
})



router.get('/query', async(req, res) => {
    const type = req.query.type
    const content = req.query.content
    console.log("in routes query req: ", type, content)

    try{
        const data = await query(type,content)
        console.log("in routes data: ", data)
        res.send({msg: data})
    }catch{
        res.send({msg: "query data fail"})
    }


})


export default router

