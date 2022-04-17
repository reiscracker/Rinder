import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { PRIMARY_COLOR, SECONDARY_COLOR } from "./constants";


export default function Button({ onPress, title, type, style }) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles[type], style]}>
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
        backgroundColor: PRIMARY_COLOR,
    },
    secondary: {
        backgroundColor: SECONDARY_COLOR,
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#eee"
    },
});

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)])
}