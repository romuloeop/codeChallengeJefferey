import React, { ReactNode, createContext, useEffect, useState } from 'react';

import OpenAI from "openai";

const CHAT_GPT_MODEL = 'gpt-4o-mini';
const API_KEY = process.env.REACT_APP_CHATSCOPE_API_KEY;

interface MessageContextType {
    llave: string | undefined;
    saluda: ()=>void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);
const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true });
const saluda = () => console.log("hola mundo")
 const MessageProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [messages, setMessages] = useState([{
        role: "user",
        content: "You are a helpful assistant."
    }]);
    useEffect(() => {
        openai.chat.completions.create({
            messages: [{
                role: "user",
                content: "You are a helpful assistant."
            }],
            model: CHAT_GPT_MODEL,
          }).then(response => {
            console.log(response)
          });
    }, []);
    console.log(process.env)
    return <MessageContext.Provider value={{saluda, llave: JSON.stringify(messages)}}>
        {children}
    </MessageContext.Provider>

};

export {MessageContext, MessageProvider};