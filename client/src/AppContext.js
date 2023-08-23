import React, { createContext, useState } from 'react';
import useToken from './useToken';

export const AppContext = createContext();

export const AppDataProvider = ({ children }) => {
    
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isQuizPrepared,setQuizPrepared] =useState(false);
    const [quizId,setQuizId]=useState('')
    const [question,setQuestion]=useState([])
    const [option,setOption]=useState([["","","",""]])
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [username,setUsername]=useState('')
    const [serverUrl,setServerUrl]=useState('http://192.168.1.2:5000')
    const {sessionId, setSessionId} = useToken();

    const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    };
    
    const contextValue = {
        isDarkTheme,
        toggleDarkTheme,
        sessionId,
        setSessionId,
        isQuizPrepared,
        setQuizPrepared,
        quizId,
        setQuizId,
        question,
        setQuestion,
        option,
        setOption,
        title,setTitle,
        description,setDescription,
        username,setUsername,
        serverUrl,
    };


    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
