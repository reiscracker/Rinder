import React, { useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { PRIMARY_COLOR } from "../constants";

export default function ChatInput({ isDisabled, onSubmit }) {
    const inputRef = useRef(null);

    const inputStyle: any = [styles.input];
    if (isDisabled) {
        inputStyle.push(styles.disabled);
    }
    return (
        <View style={styles.container}>
            <TextInput style={inputStyle}
                placeholder="Schreib etwas!"
                onSubmitEditing={(event) => { inputRef.current.clear(); onSubmit(event.nativeEvent.text); }}
                ref={inputRef}
                editable={!isDisabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        borderRadius: 20,
        borderColor: PRIMARY_COLOR,
        borderWidth: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
    disabled: {
        backgroundColor: "lightgray",
        borderColor: "silver"
    }
});