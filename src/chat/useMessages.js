import { useState, useEffect, useRef } from "react";

const GENERIC_RESPONSES = [
    "Mit mir wirds heiß",
    "Ich bin ganz saftig",
    "Willst du mich vernaschen?",
    "Iss mich!"
];
const MINIMUM_RESPONSE_DELAY = 1000;
const RANDOM_RESPONSE_DELAY = 3000;


/**
 * Yields profile generic responses until exhausted and then resorts to generic responses
 * @param {Array} profileResponses 
 * @returns 
 */
const createPickResponse = (profileResponses) => function pickResponse() {
    console.log("Profile resopnses length: ", profileResponses.length);
    if (profileResponses.length > 0) {
        return profileResponses.pop();
    } else {
        const i = Math.floor(Math.random() * GENERIC_RESPONSES.length);
        return GENERIC_RESPONSES[i];
    }
}


export default function useMessages(profileResponses) {
    const profileResponsesCopy = useRef([...profileResponses]);
    const pickResponse = createPickResponse(profileResponsesCopy.current);
    const [messages, setMessages] = useState([]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    function addResponseAfterTimeout() {
        setIsWaitingForResponse(true);
        setTimeout(() => {
            setMessages([...messages, { text: pickResponse(), sentByMe: false }]); // Message sent by Rind
            setIsWaitingForResponse(false);
        }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
    };

    // Initially the Rind should start the conversation with a message once
    useEffect(addResponseAfterTimeout, []);

    // A response from the Rind is added after each user message
    useEffect(() => {
        const isLastMessageFromUser = messages[messages.length - 1]?.sentByMe === true;
        if (isLastMessageFromUser) {
            addResponseAfterTimeout();
        }
    }, [messages]);

    function addUserMessage(text) {
        setMessages([...messages, { text, sentByMe: true }]); // message sent by user
    }

    return [messages, addUserMessage, isWaitingForResponse];
}