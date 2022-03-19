import { useState, useEffect, useRef } from "react";
import { pickRandom } from "../helpers";

const GENERIC_RESPONSES = [
    "Mit mir wirds heiß",
    "Ich bin ganz saftig",
    "Willst du mich vernaschen?",
    "Iss mich!"
];
const MINIMUM_RESPONSE_DELAY = 1000;
const RANDOM_RESPONSE_DELAY = 3000;

const oneToThree = () => Math.floor(Math.random() * 3) + 1;

/**
 * Creates a function that returns this profiles responses. It first uses the profiles specific responses
 * and then resorts to 1-3 generic responses. After the generic responses, the profiles final response is returned.
 * Afterwards returns undefined (indicating the profile does not respond anymore).
 * @param {Array} profileResponses 
 * @returns 
 */
function useResponseList(openingResponses, finalResponse) {
    const responseList = useRef([
        ...openingResponses,
        ...pickRandom(oneToThree(), GENERIC_RESPONSES),
        finalResponse,
    ].reverse()); // Reverse to pop from the end

    return function pickResponse() {
        return responseList.current.pop();
    }
}


export default function useMessages(profileResponses, finalProfileResponse) {
    const pickResponse = useResponseList(profileResponses, finalProfileResponse);
    const [messages, setMessages] = useState([]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    // Adds a response from the profile after a short random timeout
    function addProfileMessage() {
        const text = pickResponse();
        // If pickResponse returns undefined because the profile exhausted all responses, do nothing
        if (text) {
            setIsWaitingForResponse(true);
            setTimeout(() => {
                setMessages([...messages, { text, sentByMe: false }]); // Message sent by Rind
                setIsWaitingForResponse(false);
            }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
        }
    };

    function addUserMessage(text) {
        setMessages([...messages, { text, sentByMe: true }]); // message sent by user
    }

    // Initially the Rind should start the conversation with a message once
    useEffect(addProfileMessage, []);

    // A response from the Rind is added after each user message
    useEffect(() => {
        const isLastMessageFromUser = messages[messages.length - 1]?.sentByMe === true;
        if (isLastMessageFromUser) {
            addProfileMessage();
        }
    }, [messages]);


    return [messages, addUserMessage, isWaitingForResponse];
}