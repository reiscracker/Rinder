import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useMessages from "./useMessages";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingAnimation from "./TypingAnimation";

export default function Chat() {

    const [messages, addUserMessage, isWaitingForResponse] = useMessages();

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