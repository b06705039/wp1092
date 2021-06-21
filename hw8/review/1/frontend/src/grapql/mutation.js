import { gql } from "@apollo/client";

const CREATE_CHATBOX = gql`
  mutation createChatbox($name1: String!, $name2: String!) {
    createChatbox(data: { name1: $name1, name2: $name2 }) {
      name
      users {
        name
      }
      messages {
        sender {
          name
        }
        body
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation createMessage($sender: String!, $to: String!, $body: String!) {
    createMessage(data: { sender: $sender, to: $to, body: $body }) {
      id
      sender {
        name
      }
      body
    }
  }
`;

const UNFOCUS_USER = gql`
  mutation CloseUser($name1: String!, $name2: String!) {
    CloseUser(data: { name1: $name1, name2: $name2 }) {
      id
      name
      open {
        name
      }
      focus {
        name
      }
    }
  }
`;

export { CREATE_CHATBOX, SEND_MESSAGE, UNFOCUS_USER };
