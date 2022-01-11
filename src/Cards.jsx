import React, { useRef, useState } from "react";
import { Animated, Image, PanResponder, StyleSheet, Text, useWindowDimensions, View } from "react-native";


const profiles = [
    { name: "Steak", tags: ["zart", "kross", "medium"], image: require("../assets/profiles/steak.jpg") },
    { name: "Braten", tags: ["fett", "kräftig"], image: require("../assets/profiles/braten.jpg") },
    { name: "Hack", tags: ["fein", "frisch"], image: require("../assets/profiles/hack.jpg") },
    { name: "Merguez", tags: ["würzig", "scharf"], image: require("../assets/profiles/merguez.jpg") },
    { name: "TBone", tags: ["fett"], image: require("../assets/profiles/tbone.jpg") },
];

export default function Cards() {
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const position = useRef(new Animated.ValueXY()).current;
    const currentProfile = profiles[currentProfileIndex];
    const nextProfile = currentProfileIndex < profiles.length ? profiles[currentProfileIndex + 1] : null;

    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dx > 200) {
                Animated.timing(position, {
                    toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                    duration: 400,
                    useNativeDriver: true
                }).start(() => {
                    position.setValue({ x: 0, y: 0 });
                    setCurrentProfileIndex(currentProfileIndex + 1);
                });
            } else if (gestureState.dx < -200) {
                Animated.timing(position, {
                    toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                    duration: 400,
                    useNativeDriver: true
                }).start(() => {
                    position.setValue({ x: 0, y: 0 });
                    setCurrentProfileIndex(currentProfileIndex + 1);
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

    const rotate = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ["-10deg", "0deg", "10deg"],
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
        outputRange: [1, 0, 1],
        extrapolate: "clamp",
    });
    const nextCardScale = position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.container}>
            {nextProfile && <Animated.View style={[{ opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] }, styles.card]}>
                <Image style={styles.cardImage} source={nextProfile.image} />
                <Text style={styles.name}>{nextProfile.name}</Text>
                <View style={styles.tagContainer}>
                    {nextProfile.tags.map((tag, i) => <Text key={i} style={styles.tag}>{tag}</Text>)}
                </View>
            </Animated.View>}
            <Animated.View
                {...panResponder.panHandlers}
                style={[styles.card, { transform: [...position.getTranslateTransform(), { rotate }] }]}
            >
                <Animated.View style={[{ opacity: leftStampOpacity, transform: [{ rotate: "-30deg" }] }, styles.stamp, styles.leftStamp]}>
                    <Text style={[styles.stampText, styles.leftStampText]}>LECKER!</Text>
                </Animated.View>
                <Animated.View style={[{ opacity: rightStampOpacity, transform: [{ rotate: "30deg" }] }, styles.stamp, styles.rightStamp]}>
                    <Text style={[styles.stampText, styles.rightStampText]}>IGITT!</Text>
                </Animated.View>
                <Image style={styles.cardImage} source={currentProfile.image} />
                <Text style={styles.name}>{currentProfile.name}</Text>
                <View style={styles.tagContainer}>
                    {currentProfile.tags.map((tag, i) => <Text key={i} style={styles.tag}>{tag}</Text>)}
                </View>
            </Animated.View>
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
    card: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    cardImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
        borderRadius: 20,
    },
    stamp: {
        position: "absolute",
        top: 50,
        zIndex: 1000,
    },
    leftStamp: {
        left: 20,
        transform: [{ rotate: "-30deg" }],
    },
    rightStamp: {
        right: 20,
        transform: [{ rotate: "30deg" }],
    },
    stampText: {
        borderWidth: 1,
        fontSize: 32,
        fontWeight: "900",
        padding: 10,
    },
    leftStampText: {
        color: "green",
        borderColor: "green",
    },
    rightStampText: {
        color: "red",
        borderColor: "red",
    },
    name: {
        position: "absolute",
        bottom: "25%",
        left: "10%",
        color: "white",
        fontWeight: "900",
        fontSize: 32,
        textShadowColor: "black",
        textShadowRadius: 3
    },
    tagContainer: {
        position: "absolute",
        flex: 1,
        left: "10%",
        right: "10%",
        bottom: "15%",
        flexDirection: "row",
    },
    tag: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 50,
        color: "white",
        fontWeight: "bold",
        backgroundColor: "#444"
    }
});