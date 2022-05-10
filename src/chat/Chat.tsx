import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useMessages, { isSystemMessage } from "./useMessages";
import ChatBubble from "./ChatBubble";
import SystemMessage from "./SystemMessage";
import ChatInput from "./ChatInput";
import TypingAnimation from "./TypingAnimation";
import { ProfileResponse } from "../profilesData";

type ChatProps = {
    profileResponses: ProfileResponse[]
};

export default function Chat({ profileResponses }: ChatProps) {

    const [messages, addUserMessage, isWaitingForResponse] = useMessages(profileResponses);

    return (
        <View style={styles.container}>
            {messages.map((message, i) => {
                if (isSystemMessage(message)) {
                    return <SystemMessage key={i} type={message.type} text={message.text} />;
                } else {
                    return (
                        <ChatBubble key={i} sentByMe={message.type === "user"}>
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

            <ChatInput isDisabled={isWaitingForResponse} onSubmit={addUserMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    messageText: {
        color: "black"
    },
});