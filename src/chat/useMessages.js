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

const isSystemMessage = message => message.type !== undefined && message.type !== "default";

export default function useMessages(profileResponses, finalProfileResponse) {
    const pickResponse = useResponseList(profileResponses, finalProfileResponse);
    const [messages, setMessages] = useState([]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const addMessage = (message, sentByMe) => {
        if (typeof message === "string") {
            setMessages([...messages, { text: message, sentByMe, type: "default" }]);
        } else if (typeof message === "object" && message.text) {
            setMessages([...messages, { text: message.text, sentByMe, type: message.type || "default" }]);
        } else {
            throw new Error("message is not a string and has no 'text' attribute");
        }
    }
    const addMessageWithTimeout = (message, sentByMe) => {
        setIsWaitingForResponse(true);
        setTimeout(() => {
            addMessage(message, sentByMe);
            setIsWaitingForResponse(false);
        }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
    }

    function addProfileResponse() {
        const response = pickResponse();
        // pickResponse can return undefined when the profile exhausted all responses
        if (response) {
            if (isSystemMessage(response)) {
                addMessage(response, false);
            } else {
                addMessageWithTimeout(response, false);
            }
        }
    };

    function addUserMessage(text) {
        addMessage(text, true);
    }

    // Initially the Rind should start the conversation with a message once
    useEffect(addProfileResponse, []);

    // A response from the Rind is added after each user message
    useEffect(() => {
        const isLastMessageFromUser = messages[messages.length - 1]?.sentByMe === true;
        if (isLastMessageFromUser) {
            addProfileResponse();
        }
    }, [messages]);


    return [messages, addUserMessage, isWaitingForResponse];
}