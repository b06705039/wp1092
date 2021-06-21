import styled from "styled-components";
const Wrapper = styled.div`
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
`;
const MeMessage = styled.div`
    word-break: break-word;
    max-width: 30%;
    margin-right: 10px;
    padding-right: 5px;
    padding-left: 5px;
    border-radius: 5px;
    background-color: DodgerBlue;
    color: white;
`;
const FriendMessage = styled.div`
    word-break: break-word;
    max-width: 30%;
    margin-left: 10px;
    padding-right: 5px;
    padding-left: 5px;
    border-radius: 5px;
    background-color: #DCDCDC;
    color: black;
`;
const MeNameTag = styled.div`
    border: 1px solid DodgerBlue;
    font-size: 10px;
    color: DodgerBlue;
    border-radius: 3px; 
    padding-right: 5px;
    padding-left: 5px;
`;
const FriendNameTag = styled.div`
    border: 1px solid lightgray;
    font-size: 10px;
    color: gray;
    border-radius: 3px; 
    padding-right: 5px;
    padding-left: 5px;
`;

const Message = ({ name, me, body }) => {
    return (
        name === me ? 
        <Wrapper className="App-message" style={{justifyContent: "flex-end"}}>
            <MeMessage>{body}</MeMessage> <MeNameTag>{name}</MeNameTag>
        </Wrapper> : 
        <Wrapper className="App-message" style={{justifyContent: "flex-start"}}>
            <FriendNameTag>{name}</FriendNameTag> <FriendMessage>{body}</FriendMessage>
        </Wrapper>
    );
};

export default Message;