import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/' })

const add = async(username, subject, score) => {
    console.log("in axios add", username, subject, score)
    const sentMsg = JSON.stringify({username, subject, score})
    
    const {
        data: { msg }
    } = await instance.post('/addData', sentMsg)
    console.log("in axios add, get msg: ", msg)
    return msg
}

const clear = async() => {
    console.log("in axios clear")
    try{
        const {
            data: { msg }
        } = await instance.delete('/deleteData')
        console.log("in axios clear ok")
        return true
    }catch{
        console.log("in axios clear fail")
        return false
    }
    
}

const query = async(type, content) => {
    console.log("in axios query", type, content)
    const sentMsg = JSON.stringify({ type: type,content: content })
    const{
        data: { msg }
    } = await instance.get('/query', sentMsg)
    console.log("in axios query, get msg:", msg)
    return msg
}

export { add, clear, query }