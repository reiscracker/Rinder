import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function TypingAnimation() {
    const opacities = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];

    for (let i = 0; i < opacities.length; i++) {
        Animated.loop(Animated.timing(opacities[i], {
            toValue: 1,
            duration: 1000,
            // For some reason there is a noticeable gap between a delay of 0*150 and 1*150. The animation looks smoother if the first dot starts with a delay too.
            delay: (i + 1) * 150,
            useNativeDriver: true
        })).start()
    }

    return (
        <View style={styles.container}>
            <Animated.Text style={{ opacity: opacities[0] }}>.</Animated.Text>
            <Animated.Text style={{ opacity: opacities[1] }}>.</Animated.Text>
            <Animated.Text style={{ opacity: opacities[2] }}>.</Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});