import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UNFOCUS_USER, LOGIN_RESPONSE } from "../grapql";
const useChatBox = (me, activeKey, setActiveKey, startChat, setMessage) => {
  const { refetch } = useQuery(LOGIN_RESPONSE, {
    variables: { name: me },
  });
  const [Remove] = useMutation(UNFOCUS_USER);

  const [chatBoxes, setChatBoxes] = useState([]);
  const createChatBox = (friend) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    newChatBoxes.push({ friend, key: newKey, chat: 0 });
    setChatBoxes(newChatBoxes);
    setActiveKey(newKey);
    startChat(me, friend);
  };
  const removeChatBox = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter(
      (chatBox) => chatBox.key !== targetKey
    );
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    let user =
      targetKey.split("_")[0] === me
        ? targetKey.split("_")[1]
        : targetKey.split("_")[0];

    Remove({ variables: { name1: me, name2: user } });
    setChatBoxes(newChatBoxes);
    setActiveKey(newActiveKey);
  };
  useEffect(() => {
    (async () => {
      let getdata = (await refetch({ variables: { name: me } })).data;
      const newChatBoxes = getdata.userChat.open.map(({ name }) => ({
        friend: name,
        key: [me, name].sort().join("_"),
        chat: 0,
      }));
      if (
        getdata.userChat.focus !== null &&
        getdata.userChat.focus !== undefined
      ) {
        const friend = getdata.userChat.focus.name;
        const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
        setMessage(
          getdata.userChat.messages.map(({ body, sender: { name } }) => ({
            name,
            body,
          }))
        );
      }
    })();
  }, [me, setActiveKey, setMessage, refetch]);

  return { chatBoxes, createChatBox, removeChatBox, setChatBoxes };
};
export default useChatBox;
