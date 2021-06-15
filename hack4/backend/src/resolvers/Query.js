const Query = {
    people(parent, { severity, locationKeywords }, { collections } , info) {
        try{
            let u1 = collections.filter((person) => {
                return person.location.description.includes(locationKeywords);
            })
            const result = u1.filter((person)=>{ return person.severity >= severity });
            return result
        }catch{
            return null
        }
    },
}


export { Query as default };
