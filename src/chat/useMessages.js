import { useState, useEffect } from "react";

const responses = [
    "Mit mir wirds heiß",
    "Ich bin ganz saftig",
    "Willst du mich vernaschen?",
    "Iss mich!"
];
const MINIMUM_RESPONSE_DELAY = 1000;
const RANDOM_RESPONSE_DELAY = 3000;

function pickRandom(fromArray) {
    const i = Math.floor(Math.random() * fromArray.length);
    return fromArray[i];
}

export default function useMessages() {
    const [messages, setMessages] = useState([
        { text: pickRandom(responses), sentByMe: false }
    ]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    useEffect(() => {
        if (messages[messages.length - 1].sentByMe === true) {
            setIsWaitingForResponse(true);
            setTimeout(() => {
                setIsWaitingForResponse(false);
                setMessages([...messages, { text: pickRandom(responses), sentByMe: false }]); // Message sent by Rind
            }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
        }
    }, [messages]);

    function addUserMessage(text) {
        setMessages([...messages, { text, sentByMe: true }]); // message sent by user
    }

    return [messages, addUserMessage, isWaitingForResponse];
}