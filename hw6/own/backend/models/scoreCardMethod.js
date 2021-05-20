import scoreCard from './scoreCard.js'


const deleteAll = async() => {
    try{
        await scoreCard.deleteMany({})
        console.log("in scoreCardMethod, deleteAll success")
        
    }catch(e){
        throw new ERROR("in scoreCardMethod, deleteAll fail")

    }
}


const addData = async(name, subject, score) => {
    
    console.log("in scMethod, ", name, subject, score)
    try{
        const student = new scoreCard({ name, subject, score })
        console.log("in scMethod, save success", student)
        student.save()
    }catch(e){
        console.log("in scMethod, save fail")
        throw new ERROR("new scoreCard creation fail")
    }
}

const query = async(type, content) => {
    console.log("in scMethod query", type, content)
    try{
        console.log("in scMethod query find: ", {[type]: content})
        const data = await scoreCard.find( {[type]: content}); 
        console.log("in scMethod query success ", data)
        return data
    }catch(e){
        console.log("in scMethod query fail")
        return false
    }
}



export { deleteAll, addData, query }

