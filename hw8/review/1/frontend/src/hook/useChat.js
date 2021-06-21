import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SEND_MESSAGE } from "../grapql";

const useChat = (me) => {
  const [status, setStatus] = useState({}); // { type, msg }
  const [SendMessage] = useMutation(SEND_MESSAGE);
  const sendMessage = async (payload) => {
    console.log("Send");
    let users = payload.key.split("_");
    await SendMessage({
      variables: {
        sender: me,
        to: me === users[1] ? users[0] : users[1],
        body: payload.body,
      },
    });
  };
  return { status, setStatus, sendMessage };
};
export default useChat;
