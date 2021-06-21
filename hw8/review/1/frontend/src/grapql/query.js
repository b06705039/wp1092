import { gql } from "@apollo/client";
const GET_CHATBOX = gql`
  query {
    chatboxes(name: $name) {
      id
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

const LOGIN_RESPONSE = gql`
  query userChat($name: String!) {
    userChat(name: $name) {
      id
      name
      open {
        name
      }
      focus {
        name
      }
      messages {
        body
        sender {
          name
        }
      }
    }
  }
`;

export { LOGIN_RESPONSE, GET_CHATBOX };
