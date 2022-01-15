import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ChatBubble from "./ChatBubble";

export default function Chat({ responses }) {
    return (
        <View style={styles.container}>
            <ChatBubble text="Hi Süßer" />
            <ChatBubble text="Ich will dich vernaschen!" sentByMe />
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