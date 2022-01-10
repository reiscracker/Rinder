import React, { useState, useRef } from "react";
import { Dimensions, Image, Text, View, StyleSheet, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const profiles = [
    { name: "Braten", tags: ["fett"], uri: require("./assets/profiles/braten.jpg") },
    { name: "Hack", tags: ["fein"], uri: require("./assets/profiles/hack.jpg") },
    { name: "Merguez", tags: ["würzig"], uri: require("./assets/profiles/merguez.jpg") },
    { name: "Steak", tags: ["zart"], uri: require("./assets/profiles/steak.jpg") },
    { name: "TBone", tags: ["kräftig"], uri: require("./assets/profiles/tbone.jpg") },
];

const windowHeight = Dimensions.get('window').height;

function CardsWithGestureHandler() {
    const [currentProfile, setCurrentProfile] = useState(profiles[0]);
    const [nextProfile, setNextProfile] = useState(profiles[1]);
    const index = useRef(0);
    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);
    const y = new Animated.Value(0);

    const reset = Animated.parallel([
        Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }),
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }),
    ]);
    const swipeRightAnimation = Animated.timing(translateX, {
        toValue: 600,
        duration: 400,
        useNativeDriver: true
    });
    const swipeLeftAnimation = Animated.timing(translateX, {
        toValue: -600,
        duration: 400,
        useNativeDriver: true
    });

    const handleSwipe = ({ nativeEvent }) => {
        const { state, translationX } = nativeEvent;
        if (state === 5) {
            if (nativeEvent.translationX < -225) {
                console.log("Swiped left");
                setCurrentProfile(nextProfile);
                index.current += 1;
                setNextProfile(profiles[index.current + 1])
                swipeLeftAnimation.start(() => {
                    setCurrentProfile(profiles[index.current]);
                });
            } else if (nativeEvent.translationX > 225) {
                console.log("Swiped right");
                setCurrentProfile(nextProfile);
                index.current += 1;
                setNextProfile(profiles[index.current + 1])
                swipeRightAnimation.start(() => {
                    setCurrentProfile(profiles[index.current]);
                });
            } else {
                console.log("Reset");
                reset.start();
            }
        }
    };

    const TopOrBottom = y.interpolate({ inputRange: [0, windowHeight / 2 - 1, windowHeight / 2], outputRange: [1, 1, -1], extrapolate: 'clamp' });
    const rotate = Animated.multiply(translateX, TopOrBottom).interpolate({
        inputRange: [-500, 500],
        outputRange: [`-30deg`, `30deg`],
        extrapolate: 'clamp'
    });

    const handlePan = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY, y } }], { useNativeDriver: true }
    )

    return (
        <View style={styles.container}>
            <View style={[styles.card]}>
                <Image source={nextProfile.uri} style={styles.cardImage} />
                <Text>{nextProfile.name}</Text>
                <Text>{nextProfile.tags.join(", ")}</Text>
            </View>
            <PanGestureHandler onHandlerStateChange={handleSwipe} onGestureEvent={handlePan}>
                <Animated.View style={[styles.card, { transform: [{ translateX }, { translateY }, { rotate }] }]}>
                    <Image source={currentProfile.uri} style={styles.cardImage} />
                    <Text>{currentProfile.name}</Text>
                    <Text>{currentProfile.tags.join(", ")}</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // width: "100%",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT - 120,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "red"
    },
    card: {
        // padding: 10,
        backgroundColor: "rgb(230,230,230)",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        position: 'absolute',
        borderWidth: 1.5,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImage: {
        // flex: 1,
        resizeMode: "cover",
        width: "100%",
        height: "100%"
    }
})

export default CardsWithGestureHandler;