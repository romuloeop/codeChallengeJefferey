import React, { ReactNode, createContext, useEffect, useState } from 'react';

import type { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import OpenAI from "openai";

const CHAT_GPT_MODEL = 'gpt-4o-mini';
const API_KEY = process.env.REACT_APP_CHATSCOPE_API_KEY;

interface MessageContextType {
    llave: string | undefined;
    saluda: ()=>void;
    setUserMessage: (userMessage: string)=>void;
    messages: ChatCompletionMessageParam[];
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);
const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true });
const saluda = () => console.log("hola mundo")
 const MessageProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const [userMessage, setUserMessage] = useState('');
    useEffect(() => {
        if(userMessage === '') return;
        openai.chat.completions.create({
            messages: [...messages, {role: 'user', content: userMessage} ],
            model: CHAT_GPT_MODEL,
          }).then(response => {
            const {role, content} = response.choices[0].message;
            setMessages([...messages, {role: 'user', content: userMessage} ,{role, content: content ?? ''}]);
            setUserMessage('');
          });
    }, [userMessage]);
    return <MessageContext.Provider value={{saluda, llave: JSON.stringify(messages), setUserMessage, messages}}>
        {children}
    </MessageContext.Provider>

};

export {MessageContext, MessageProvider};