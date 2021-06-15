const Query = {
    people(parent, { severity, locationKeywords }, { collections } , info) {
      if (!severity || !locationKeywords) {
        return collections;
      }
      console.log("in Query Persons: ", collections)
  
      let u1 = collections.filter((person) => {
        return person.location.description.includes(locationKeywords);
      })
      return u1.filter((person)=>{ return person.severity >= severity });
    },
}


export { Query as default };
