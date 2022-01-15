import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from '@react-navigation/native';

/*
    Found help for designing these message bubbles at https://www.freecodecamp.org/news/design-imessage-like-chat-bubble-react-native/
    Thanks Prajwal Kulkarni !
*/

export default function ChatBubble({ text, sentByMe = false }) {
    const { colors } = useTheme();
    const bubbleStyle = sentByMe ? "me" : "other";

    return (
        <View style={[styles.container, styles[bubbleStyle]]}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles[bubbleStyle + "Arrow"]}></View>
            <View style={[styles[bubbleStyle + "ArrowOverlap"], { backgroundColor: colors.background }]}></View>
        </View>
    );
}

ChatBubble.propTypes = {
    text: PropTypes.string.isRequired,
    sentByMe: PropTypes.bool,
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: "5%",
        maxWidth: "50%",
    },
    me: {
        backgroundColor: "lightgreen",
        alignSelf: "flex-end",
    },
    other: {
        backgroundColor: "lightgray",
        alignSelf: "flex-start",

    },
    text: {
        color: "black"
    },
    meArrow: {
        position: "absolute",
        backgroundColor: "lightgreen",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -10
    },
    meArrowOverlap: {
        position: "absolute",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -19
    },
    otherArrow: {
        position: "absolute",
        backgroundColor: "lightgray",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    otherArrowOverlap: {
        position: "absolute",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -19
    },
});