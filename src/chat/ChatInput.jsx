import React, { useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";
import Button from "../Button";

export default function ChatInput({ onSubmit }) {
    const inputRef = useRef();

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                placeholder="Schreib etwas!"
                onSubmitEditing={(event) => { inputRef.current.clear(); onSubmit(event.nativeEvent.text); }}
                ref={inputRef}
            />
        </View>
    );
}

ChatInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderRadius: 20,
        borderColor: "silver",
        borderWidth: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
    }
});