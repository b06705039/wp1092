const Subscription = {
    message: {
        async subscribe(parent, { chatBoxName }, { db, pubsub }, info){
            const chatBoxSubscribe = await pubsub.asyncIterator(`message ${chatBoxName}`)

            return chatBoxSubscribe

        }
        
    },

};

export { Subscription as default };
