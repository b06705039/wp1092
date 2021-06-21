import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX } from "./grapql";
function UseServer(messages, setMessage) {
  const [CreateChatBox] = useMutation(CREATE_CHATBOX);

  const startChat = async (sender, accepter) => {
    if (!sender || !accepter) {
      throw new Error("Fill in the inputs");
    }
    let res = await CreateChatBox({
      variables: { name1: sender, name2: accepter },
    });
    setMessage(
      res.data
        ? res.data.createChatbox.messages.map(({ body, sender: { name } }) => ({
            body,
            name,
          }))
        : []
    );
  };
  const SendMessage = () => console.log("Send is called");
  return { messages, startChat, SendMessage };
}

export default UseServer;
