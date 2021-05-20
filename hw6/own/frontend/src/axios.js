import axios from 'axios'

const instance = axios.create({ 
    baseURL: 'http://localhost:4000',
 })

 


const add = async(username, subject, score) => {
    console.log("in axios add", username, subject, score)
    
    const sentMsg = {"username":username, "subject":subject, "score":score}
    console.log("in axios before sent: ", sentMsg)
    

    const {
        data: { msg }
    } = await instance.post('/add', {"username":username, "subject":subject, "score":score} )

    console.log("in axios add, get msg & ifexisting: ", msg)
    return msg
}






const clear = async() => {
    console.log("in axios clear")
    try{
        const {
            data: { msg }
        } = await instance.delete('/delete')
        console.log("in axios clear ok")
        return true
    }catch{
        console.log("in axios clear fail")
        return false
    }
    
}

const query = async(type, content) => {
    console.log("in axios query", type, content)
    const{
        data: { msg }
    } = await instance.get('/query', { params: { 
                                            "type":type, 
                                            "content":content }})


    console.log("in axios query, get msg:", msg)
    return msg
}

export { add, clear, query }

