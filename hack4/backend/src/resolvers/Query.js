const Query = {
    people(parent, { severity, locationKeywords }, { collections } , info) {
        try{
            let u1 = collections.filter((person) => {
                return person.location.description.includes(locationKeywords);
            })
            if(!severity) return u1
            const result = u1.filter((person)=>{ return person.severity >= severity });
            return result
        }catch{
            return null
        }
    },
    statsCount(parent, { severity, locationKeywords }, { collections } , info) {
        try{
            let u1 = collections.filter((person) => {
                return person.location.description.includes(locationKeywords);
            })
            if(!severity) return u1.length
            const result = u1.filter((person)=>{ return person.severity >= severity });
            return result.length
        }catch{
            return null
        }
    },
}


export { Query as default };
