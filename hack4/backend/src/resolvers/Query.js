const Query = {
    people(parent, { severity, locationKeywords }, { collections } , info) {
        try{
            console.log(severity, locationKeywords)
            let u1 = collections.filter((person) => {
                const keymap = key=>{ return person.location.description.includes(key)}
                return (locationKeywords.some(keymap))? true:false
            })
            if(!severity) return u1
            const result = u1.filter((person)=>{ return person.severity >= severity });
            return result
        }catch(err){
            return null
        }
    },
    statsCount(parent, { severity, locationKeywords }, { collections } , info) {
        try{
            
            let u1 = collections.filter((person) => {
                const keymap = key=>{ return person.location.description.includes(key)}
                return (locationKeywords.some(keymap))? true:false
            })
            if(!severity) return u1.length
            const result = u1.filter((person)=>{ return person.severity >= severity });
            return result.length===0? null:result.length
        }catch{
            return null
        }
    },
}


export { Query as default };
