import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

function pickRandom(fromArray) {
    const i = Math.floor(Math.random() * fromArray.length);
    return fromArray[i];
}

export default function Chat({ responses }) {
    const [messages, setMessages] = useState([
        { text: pickRandom(responses), sentByMe: false }
    ]);
    useEffect(() => {
        if (messages[messages.length - 1].sentByMe === true) {
            setTimeout(() => {
                setMessages([...messages, { text: pickRandom(responses), sentByMe: false }]); // Message sent by Rind
            }, 1000);
        }
    }, [messages]);


    return (
        <View style={styles.container}>
            {messages.map((message, i) => <ChatBubble key={i} {...message} />)}
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
    }
});