import React, { useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView, Image, Animated, Dimensions, PanResponder } from 'react-native';
import NativeCards from "./NativeCards";
import GestureHandlerCards from "./GestureHandlerCards";
import SwipeableCards from "./SwipeableCards";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ height: 30 }}>
      </View>
      <Text style={styles.appTitle}>Rinder</Text>
      {/* <NativeCards /> */}
      <GestureHandlerCards />
      {/* <SwipeableCards /> */}
      <View style={{ height: 60 }}>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    color: "red",
    fontSize: 34,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "serif"
  }
});
