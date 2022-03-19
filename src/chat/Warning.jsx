import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from '@react-navigation/native';

export default function ChatBubble({ children, sentByMe = false }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

ChatBubble.propTypes = {
    children: PropTypes.element,
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: "5%",
        maxWidth: "50%",
        alignSelf: "center",
        backgroundColor: "yellow"
    },
});