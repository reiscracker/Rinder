import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingAnimation from "./TypingAnimation";

function pickRandom(fromArray) {
    const i = Math.floor(Math.random() * fromArray.length);
    return fromArray[i];
}

export default function Chat({ responses }) {
    const [messages, setMessages] = useState([
        { text: pickRandom(responses), sentByMe: false }
    ]);
    const [showTypingAnimation, setShowTypingAnimation] = useState(false);

    const MINIMUM_RESPONSE_DELAY = 2000;
    const RANDOM_RESPONSE_DELAY = 5000;

    useEffect(() => {
        if (messages[messages.length - 1].sentByMe === true) {
            setShowTypingAnimation(true);
            setTimeout(() => {
                setShowTypingAnimation(false);
                setMessages([...messages, { text: pickRandom(responses), sentByMe: false }]); // Message sent by Rind
            }, Math.random() * RANDOM_RESPONSE_DELAY + MINIMUM_RESPONSE_DELAY);
        }
    }, [messages]);

    return (
        <View style={styles.container}>
            {messages.map((message, i) => (
                <ChatBubble key={i} sentByMe={message.sentByMe}>
                    <Text style={styles.messageText}>{message.text}</Text>
                </ChatBubble>
            ))}

            {showTypingAnimation && (
                <ChatBubble>
                    <TypingAnimation />
                </ChatBubble>
            )}

            <ChatInput onSubmit={(text) => {
                setMessages([...messages, { text, sentByMe: true }]); // message sent by user
            }} />
        </View>
    );
}

Chat.propTypes = {
    responses: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    messageText: {
        color: "black"
    }
});