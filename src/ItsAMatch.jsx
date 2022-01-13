import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function ItsAMatch() {
    return (
        <>
            <Text style={styles.emoji}>🎉</Text>
            <Text style={styles.text}>It's a match!</Text>
        </>
    );
}

const styles = StyleSheet.create({
    emoji: {
        textAlign: "center",
        fontSize: 75,
    },
    text: {
        color: "red",
        textAlign: "center",
        fontSize: 50,
        textShadowColor: "black",
        textShadowRadius: 3
    }
});
