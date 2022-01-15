import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";

export default function ChatScreenHeader({ image, name }) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <Text style={styles.text}>Chat mit {name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 15,
    },
    text: {
        fontSize: 24,
        color: "red",
        fontWeight: "bold"
    }
});

ChatScreenHeader.propTypes = {
    image: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
}