import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useMessages from "./useMessages";
import ChatBubble from "./ChatBubble";
import Warning from "./Warning";
import ChatInput from "./ChatInput";
import TypingAnimation from "./TypingAnimation";
import PropTypes from "prop-types";

export default function Chat({ profileResponses, finalProfileResponse }) {

    const [messages, addUserMessage, isWaitingForResponse] = useMessages(profileResponses, finalProfileResponse);

    return (
        <View style={styles.container}>
            {messages.map((message, i) => {
                if (message.type === "warning") {
                    return (
                        <Warning key={i}>
                            <Text style={styles.messageText}>{message.text}</Text>
                        </Warning>
                    );
                } else {
                    return (
                        <ChatBubble key={i} sentByMe={message.sentByMe}>
                            <Text style={styles.messageText}>{message.text}</Text>
                        </ChatBubble>
                    );
                }
            })}

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
    profileResponses: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
    finalProfileResponse: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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