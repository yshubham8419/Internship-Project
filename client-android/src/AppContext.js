import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppDataProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [sessionId, setSessionId ] = useState('');
    const [isQuizPrepared,setQuizPrepared] =useState(false);
    const [quizId,setQuizId]=useState('')
    const [question,setQuestion]=useState([])
    const [option,setOption]=useState([])
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [username,setUsername]=useState('')
    const [serverUrl,setServerUrl]=useState('http://192.168.1.208:5000')
    const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    };
    const resetStates = () => {
        setSessionId('');
        setQuizPrepared(false);
        setQuizId('');
        setQuestion([]);
        setOption([]);
        setTitle('');
        setDescription('');
        setUsername('');
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
        resetStates,
        setServerUrl
    };


    return (
    <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
    );
};
