import uuidv4 from 'uuid/v4';
import { makeName } from '../utilities'

const Query = {

    user( parent, { name }, { db }, info ) {
        
        let u1 = db.UserModel.find({name})
        return u1
    },

    
    async chatBox( parent, { name1, name2 }, { db }, info ) {
        if(!name1 || !name2){
            throw Error("no name input")
        }
        const chatBoxName = makeName(name1, name2)
        let result = await db.ChatBoxModel.find({name:chatBoxName})
        return result
    }
};

export { Query as default };
