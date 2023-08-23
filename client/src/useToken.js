import { useState } from 'react';

export default function useToken() {
    function getSessionId() {
        const userToken = sessionStorage.getItem('token');
        return userToken;
    }

    const [sessionId, setSessionId] = useState(getSessionId());

    function saveSessionId(userToken) {
        sessionStorage.setItem('token', userToken);
        setSessionId(userToken);
    }

    return {
        setSessionId: saveSessionId,
        sessionId
    }
}