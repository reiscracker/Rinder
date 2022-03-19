import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useMessages from "./useMessages";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingAnimation from "./TypingAnimation";
import PropTypes from "prop-types";

export default function Chat({ profileResponses, finalProfileResponse }) {

    const [messages, addUserMessage, isWaitingForResponse] = useMessages(profileResponses, finalProfileResponse);

    return (
        <View style={styles.container}>
            {messages.map((message, i) => (
                <ChatBubble key={i} sentByMe={message.sentByMe}>
                    <Text style={styles.messageText}>{message.text}</Text>
                </ChatBubble>
            ))}

            {isWaitingForResponse && (
                <ChatBubble>
                    <TypingAnimation />
                </ChatBubble>
            )}

            <ChatInput onSubmit={addUserMessage} />
        </View>
    );
}

Chat.propTypes = {
    profileResponses: PropTypes.arrayOf(PropTypes.string).isRequired,
    finalProfileResponse: PropTypes.string,
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