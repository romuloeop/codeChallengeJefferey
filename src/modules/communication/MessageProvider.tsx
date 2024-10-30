import React, { ReactNode, createContext, useEffect, useState } from 'react';

import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import OpenAI from "openai";

const CHAT_GPT_MODEL = 'gpt-4o-mini';
const API_KEY = process.env.REACT_APP_CHATSCOPE_API_KEY ?? '';

interface MessageType {
    id: string;
    created: number;
    role: string;
    content: string;
}
interface MessageContextType {
    setUserMessage: (userMessage: string)=>void;
    messages: MessageType[];
}
interface MessageRequestParams {
    messages: ChatCompletionMessageParam[];
    model: string;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);
const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true });
 const MessageProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [userMessage, setUserMessage] = useState('');
    useEffect(() => {
        if(userMessage === '') return;
        const sentOn = Date.now();
        openai.chat.completions.create({
            messages: [...messages.map(msg => ({role: msg.role, content: msg.content})), {role: 'user', content: userMessage} ],
            model: CHAT_GPT_MODEL,
          } as MessageRequestParams).then((response, ...args) => {
            console.log(response);
            const {role, content} = response.choices[0].message;
            setMessages(msgs => [...msgs, {id: response['_request_id'] ?? '' , role: 'user', content: userMessage, created: sentOn} ,{id: response.id, role, content: content ?? '', created: Date.now()}]);
            setUserMessage('');
          });
    }, [userMessage]);
    return <MessageContext.Provider value={{setUserMessage, messages}}>
        {children}
    </MessageContext.Provider>

};

export {MessageContext, MessageProvider};