import { gql } from "@apollo/client";

const SUBSCRIBE = gql`
  subscription {
    newMessage {
      mutation
      body
      sender
      to
    }
  }
`;
export { SUBSCRIBE };
