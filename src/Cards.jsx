import PropTypes from "prop-types";
import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Card from "./Card";
import EndCard from "./EndCard";
import useProfiles from "./useProfiles";
import useRandomEvent from "./useRandomEvent";


export default function Cards({ onMatch }) {
    const position = useRef(new Animated.ValueXY()).current;
    const tapStartPosition = useRef(new Animated.ValueXY()).current;
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
    const [currentProfile, nextProfile, toNextProfile, resetProfiles] = useProfiles();
    const triggerMatchChance = useRandomEvent(() => onMatch(currentProfile));

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderStart: (event, gestureState) => {
            tapStartPosition.setValue({ x: gestureState.x0, y: gestureState.y0 });
        },
        onPanResponderMove: (event, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dx > 200) { // Swiped right
                Animated.timing(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy * 2 },
                    duration: 200,
                    useNativeDriver: true
                }).start(() => {
                    triggerMatchChance();
                    position.setValue({ x: 0, y: 0 });
                    toNextProfile();
                });
            } else if (gestureState.dx < -200) { // Swiped left
                Animated.timing(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy * 2 },
                    duration: 200,
                    useNativeDriver: true
                }).start(() => {
                    position.setValue({ x: 0, y: 0 });
                    toNextProfile();
                });
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: 0 },
                    friction: 4,
                    useNativeDriver: true
                }).start();
            }
        }
    });

    const rotateDirection = tapStartPosition.y.interpolate({ inputRange: [0, SCREEN_HEIGHT / 2 - 50, SCREEN_HEIGHT], outputRange: [-1, -1, 1], extrapolate: 'clamp' });
    const rotate = Animated.multiply(position.x, rotateDirection).interpolate({
        inputRange: [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
        outputRange: ["-20deg", "20deg"],
        extrapolate: "clamp",
    });
    const leftStampOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
        outputRange: [0, 0, 1, 0],
        extrapolate: "clamp",
    });
    const rightStampOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: "clamp",
    });
    const nextCardOpacity = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0.5, 0, 0.5],
        extrapolate: "clamp",
    });
    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.container}>
            {nextProfile ? (
                <Animated.View style={[{ opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] }, styles.cardContainer]}>
                    <Card imageSource={nextProfile.image} name={nextProfile.name} tags={nextProfile.tags} />
                </Animated.View>
            ) : (
                <EndCard onResetPress={resetProfiles} />
            )}
            {currentProfile && (
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.cardContainer, { transform: [...position.getTranslateTransform(), { rotate: rotate }] }]}
                >
                    <Animated.View style={[{ opacity: leftStampOpacity, transform: [{ rotate: "-30deg" }] }, styles.stamp, styles.leftStamp]}>
                        <Text style={[styles.stampText, styles.leftStampText]}>😍</Text>
                    </Animated.View>
                    <Animated.View style={[{ opacity: rightStampOpacity, transform: [{ rotate: "30deg" }] }, styles.stamp, styles.rightStamp]}>
                        <Text style={[styles.stampText, styles.rightStampText]}>🤮</Text>
                    </Animated.View>
                    <Card imageSource={currentProfile.image} name={currentProfile.name} tags={currentProfile.tags} />
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cardContainer: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    stamp: {
        position: "absolute",
        top: 10,
        zIndex: 1000,
    },
    leftStamp: {
        left: 10,
        transform: [{ rotate: "-30deg" }],
    },
    rightStamp: {
        right: 10,
        transform: [{ rotate: "30deg" }],
    },
    stampText: {
        // borderWidth: 3,
        fontSize: 120,
        fontWeight: "900",
        padding: 10,
    },
    leftStampText: {
        color: "green",
        // borderColor: "green",
    },
    rightStampText: {
        color: "red",
        // borderColor: "red",
    },
    itsAMatch: {
        position: "absolute",
        zIndex: 1000,
    }
});

Cards.propTypes = {
    onMatch: PropTypes.func.isRequired,
}