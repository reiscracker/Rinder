import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";


export default function Button({ onPress, title, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[style]]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
    },
    primary: {
        backgroundColor: "red",
    },
    secondary: {
        backgroundColor: "#732929cc",
    },
    text: {
        fontWeight: "bold",
        color: "#eee"
    },
});

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.oneOf(["primary", "secondary"]).isRequired
}