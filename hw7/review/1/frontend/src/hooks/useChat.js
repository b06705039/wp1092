import { useState } from "react";
import useClient from "./useClient";
const useChat = () => {
  const client = useClient();
  const [status, setStatus] = useState({});
  const sendMessage = (payload) => {
    const friend =
      payload.key.split("_")[0] === payload.me
        ? payload.key.split("_")[1]
        : payload.key.split("_")[0];
    // console.log(payload);
    client.sendMessage(payload.me, friend, payload.body);
  };
  return { status, sendMessage };
};
export default useChat;
