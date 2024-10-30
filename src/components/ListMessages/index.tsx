import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './style.css';

import {
    Avatar,
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
    return <div className="ListMessages">
    <MainContainer>
      <ChatContainer>
        <MessageList>
            {messages?.map(message => 
                <Message
                    key = {message.id} 
                    model={{
                    message: `${message.content}`,
                    sentTime: new Date(message.created).toLocaleDateString(),
                    sender: message.role === 'user' ? 'Me' : 'Bobert',
                    direction: message.role === 'user' ? 'outgoing' : 'incoming',
                    position: 0,
                    }}
                >
                    {message.role !== 'user' && <Avatar name={'Bobert'} src="https://www.svgrepo.com/show/17322/avatar.svg" />}
                     <Message.Header
                        sender={message.role === 'user' ? 'Me' : 'Bobert'}
                        sentTime={`${new Date(message.created).toLocaleDateString()} ${new Date(message.created).toLocaleTimeString()}`}
                    />
                </Message>
            )}
        </MessageList>
        <MessageInput placeholder="Type message here" value={userMessage} onChange={onChangeHandler} attachButton={false} onSend={() => {
            context?.setUserMessage(userMessage);
            setUserMessage('');
        }}/>
      </ChatContainer>
    </MainContainer>
  </div>
}