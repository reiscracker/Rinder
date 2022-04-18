import { useState, useEffect, useRef } from "react";
import { pickRandom } from "../helpers";
import { ProfileResponse } from "../profiles";

type Message = {
    type: Exclude<ProfileResponse["type"], "await user message"> | "user",
    text: string;
};

const MINIMUM_RESPONSE_DELAY = 1000;
const RANDOM_RESPONSE_DELAY = 1000;

export const isSystemMessage = (message: Message | ProfileResponse) => message.type === "info" || message.type === "warning";

export default function useMessages(profileResponses: ProfileResponse[]): [Message[], (text: string) => void, boolean] {
    const remainingResponses = useRef([...profileResponses].reverse());
    const [messages, setMessages] = useState<Message[]>([]);
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

    const addMessage = (message: Message) => {
        setMessages([...messages, message]);
    }
    const addMessageWithTimeout = (message) => {
        setIsWaitingForResponse(true);
        setTimeout(() => {
            addMessage(message);
            setIsWaitingForResponse(false);
        }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
    }

    /**
     * Pops the next profile response off the stack and handles it.
     * If it indicates a breakpoint ('await user message') nothing is done.
     * If it indicates a response message, it is formatted and added to the messages list.
     * @returns 
     */
    const addProfileResponse = () => {
        const response = remainingResponses.current.pop();
        if (!response || response.type === "await user message") {
            return;
        }
        const message = { type: response.type, text: response.text };
        if (isSystemMessage(message)) {
            addMessage(message);
        } else {
            addMessageWithTimeout(message);
        }
    }

    function addUserMessage(text) {
        addMessage({ type: "user", text });
    }

    // After every message check whether the profile should send a response message.
    // Also triggers on initial component render so that each chat starts with the profile sending a message.
    useEffect(() => {
        // If there are no response messages left, do nothing
        if (remainingResponses.current.length === 0) {
            return;
        }
        addProfileResponse();
    }, [messages]);


    return [messages, addUserMessage, isWaitingForResponse];
}