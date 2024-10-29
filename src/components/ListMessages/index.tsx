import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useContext, useState } from "react";

import { MessageContext } from "../../modules/communication/MessageProvider";

export const ListMessages = function() {
    const context = useContext(MessageContext)
    const messages = context?.messages;
    const [userMessage, setUserMessage] = useState('');

    const onChangeHandler = (msg: string) => {
        setUserMessage(msg);
    };
    return <div style={{ position: "relative", height: "500px" }}>
    <MainContainer>
      <ChatContainer>
        <MessageList>
            {messages?.map(message => 
                <Message
                    model={{
                    message: `${message.content}`,
                    sentTime: "just now",
                    sender: "Joe",
                    direction: message.role === 'user' ? 'outgoing' : 'incoming',
                    position: 0,
                    }}
                />
            )}
        </MessageList>
        <MessageInput placeholder="Type message here" value={userMessage} onChange={onChangeHandler} onSend={() => {
            context?.setUserMessage(userMessage);
            setUserMessage('');
        }}/>
      </ChatContainer>
    </MainContainer>
  </div>
}