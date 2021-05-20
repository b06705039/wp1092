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
    

    const querySet = { name, subject }
    const existing = await scoreCard.findOne(querySet); 
    console.log("in scMethod, ", name, subject, score, existing)

    if (existing){
        try{
            const student = await scoreCard.updateOne({ name: name , subject: subject}, { score: score });

            // let result = await Model.update({name: 'dora'}, {$set: {age: 18}})
            console.log("in scMethod, update success", student, existing)
            
        }catch(e){
            console.log("in scMethod, update fail")
            throw new ERROR("update scoreCard fail")
        }
    }else{
        try{
            const student = new scoreCard({ name, subject, score })
            await student.save()
                console.log("in scMethod, save success", student)
        }catch(e){
            console.log("in scMethod, save fail")
            throw new ERROR("new scoreCard creation fail")
        }
    }

    return existing
    // try{
    //     const student = new scoreCard({ name, subject, score })
    //     await student.save()
    //     if (existing){
    //         console.log("in scMethod, update success", student)
    //         return true
    //     }else{
    //         console.log("in scMethod, save success", student)
    //         return false
    //     }
    // }catch(e){
    //     console.log("in scMethod, save fail")
    //     throw new ERROR("new scoreCard creation fail")
    // }
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

