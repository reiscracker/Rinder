import React, { useRef } from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView, Image, Animated, Dimensions, PanResponder } from 'react-native';
import NativeCards from "./NativeCards";


export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ height: 30 }}>
      </View>
      <Text style={styles.appTitle}>Rinder</Text>
      <NativeCards />
      <View style={{ height: 60 }}>
      </View>
    </View>
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
