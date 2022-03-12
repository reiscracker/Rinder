import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image, Easing } from "react-native";
import PropTypes from "prop-types";
import Button from "./Button";
import { PRIMARY_COLOR } from "./constants";

export default function ItsAMatch({ imageSource, onChatPress, onCancelPress }) {
    const scale = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: true
        }).start();
    }, [scale]);

    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <Text style={styles.text}>Angebissen! 🤤</Text>
            <Image style={styles.image} source={imageSource} />
            <View style={styles.buttonContainer}>
                <Button type="primary" style={styles.firstButton} onPress={onChatPress} title="Reinbeißen!" />
                <Button type="secondary" onPress={onCancelPress} title="Jetzt nicht.." />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "space-between",
        flex: 1,
        padding: 10,
        // paddingBottom: 15,
    },
    text: {
        color: PRIMARY_COLOR,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 35,
        fontFamily: "sans-serif",
        textShadowColor: "black",
        textShadowRadius: 2,
        flex: 1,
    },
    image: {
        resizeMode: "cover",
        width: null,
        height: null,
        flex: 5,
        borderRadius: 20
    },
    buttonContainer: {
        justifyContent: "space-between",
        marginTop: 10,
    },
    firstButton: {
        marginBottom: 10,
    }
});

ItsAMatch.propTypes = {
    imageSource: PropTypes.any.isRequired,
    onChatPress: PropTypes.func.isRequired,
    onCancelPress: PropTypes.func.isRequired,
}