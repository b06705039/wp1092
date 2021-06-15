import uuidv4 from 'uuid/v4';

const Mutation = {
    insertPeople(parent, { data }, { collections, pubsub }, info){
        try{
            const user = collections.find((person) => person.ssn === data.ssn);
            console.log("user: ", user)
            if(!user){
                user = {
                    id: uuidv4(),
                    ...data,
                };
                collections.push(data)
            }else{
                user.name = data.name
                user.severity = data.severity
                user.location.name = data.location.name
                user.location.description = data.location.description
            }
            return true
        } catch{
            console.log("err")
            return false
        }
    }
};

export { Mutation as default };
