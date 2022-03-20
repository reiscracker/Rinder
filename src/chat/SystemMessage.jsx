import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

export default function SystemMessage({ text, type }) {
    return (
        <View style={[styles.container, styles[type]]}>
            <Text style={styles[`${type}Text`]}>{text}</Text>
        </View>
    );
}

SystemMessage.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "warning"]).isRequired,
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: "5%",
        maxWidth: "80%",
        alignSelf: "center",
    },
    warning: {
        backgroundColor: "#feed9c"
    },
    info: {
        backgroundColor: "#e6e0e0"
    },
    warningText: {
        color: "#905121"
    },
    infoText: {
        color: "#333333"
    }
});