import React, { Component, useRef } from "react";
import { Button, StyleSheet, Text, View, ScrollView, Image, Animated, Dimensions, PanResponder } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const Foods = [
    { id: 1, uri: require("./assets/profiles/braten.jpg") },
    { id: 2, uri: require("./assets/profiles/hack.jpg") },
    { id: 3, uri: require("./assets/profiles/merguez.jpg") },
    { id: 4, uri: require("./assets/profiles/steak.jpg") },
    { id: 5, uri: require("./assets/profiles/tbone.jpg") },
]


class CardsWithPanResponder extends Component {

    constructor() {
        super();
        this.position = new Animated.ValueXY();
        this.state = {
            currentIndex: 0,
        };
        this.setupPanResponder();
    }

    renderFoods() {
        this.rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: ["-10deg", "0deg", "10deg"],
            extrapolate: "clamp",
        });
        this.rotateAndTranslate = {
            transform: [
                {
                    rotate: this.rotate,
                },
                ...this.position.getTranslateTransform(),
            ]
        };
        this.likeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [0, 0, 1],
            extrapolate: "clamp",
        });
        this.nopeOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 0],
            extrapolate: "clamp",
        });
        this.nextCardOpacity = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0, 1],
            extrapolate: "clamp",
        });
        this.nextCardScale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            outputRange: [1, 0.8, 1],
            extrapolate: "clamp",
        });
        return Foods.map((item, i) => {
            if (i < this.state.currentIndex) {
                return null;
            } else if (i == this.state.currentIndex) {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={i}
                        style={[
                            this.rotateAndTranslate,
                            { width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 120, padding: 10, position: "absolute" }
                        ]}
                    >
                        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: "-30deg" }], position: "absolute", top: 50, left: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: "green", color: "green", fontSize: 32, fontWeight: "800", padding: 10 }}>
                                LECKER
                            </Text>
                        </Animated.View>
                        <Animated.View style={{ opacity: this.nopeOpacity, transform: [{ rotate: "30deg" }], position: "absolute", top: 50, right: 40, zIndex: 1000 }}>
                            <Text style={{ borderWidth: 1, borderColor: "red", color: "red", fontSize: 32, fontWeight: "800", padding: 10 }}>
                                IGITT
                            </Text>
                        </Animated.View>
                        <Image style={{ flex: 1, width: null, height: null, resizeMode: "cover", borderRadius: 20 }} source={item.uri} />
                    </Animated.View>
                )
            } else {
                return (
                    <Animated.View
                        {...this.PanResponder.panHandlers}
                        key={i}
                        style={[
                            { opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }], width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 120, padding: 10, position: "absolute" }
                        ]}
                    >
                        <Image style={{ flex: 1, width: null, height: null, resizeMode: "cover", borderRadius: 20 }} source={item.uri} />
                    </Animated.View>
                );
            }
        }).reverse();
    }


    setupPanResponder() {
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 200) {
                    Animated.spring(this.position, {
                        toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                        useNativeDriver: true,
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    });
                } else if (gestureState.dx < -200) {
                    Animated.spring(this.position, {
                        toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                        useNativeDriver: true,
                    }).start(() => {
                        this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                            this.position.setValue({ x: 0, y: 0 })
                        })
                    });

                } else {
                    Animated.spring(this.position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                        friction: 4
                    }).start();
                }
            }
        });
    }

    render() {
        return <View style={{ flex: 1 }}>
            {this.renderFoods()}
        </View>
    }
}

export default CardsWithPanResponder;