import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Button from "./Button";

export default function EndCard({ onResetPress }) {
    return (
        <View style={styles.container}>
            <Text style={styles.emojiText}>😵</Text>
            <Text style={styles.emptyText}>Der Grill ist leider gerade leer...</Text>
            <View style={styles.row}>
                <Button onPress={onResetPress} type="primary" title="Aber ich bin hungrig..." />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingVertical: 100,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    emojiText: {
        fontSize: 120,
    },
    emptyText: {
        fontSize: 34,
    },
    row: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-around"
    },
});

EndCard.propTypes = {
    onResetPress: PropTypes.func,
}