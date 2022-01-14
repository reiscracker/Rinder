import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Cards from './src/Cards';
import ItsAMatch from "./src/ItsAMatch";


export default function App() {
  const [match, setMatch] = useState(null);

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>Rinder</Text>
      </View>
      <View style={styles.mainContent}>
        {match && <>
          <View style={[styles.overlay, styles.opaque]}></View>
          <View style={styles.overlay}>
            <ItsAMatch imageSource={match.image} onChatPress={() => { }} onCancelPress={() => setMatch(null)} />
          </View>
        </>}
        <Cards onMatch={matched => setMatch(matched)} />
      </View>
      <View style={styles.footer}>
      </View>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 50
  },
  footer: {
    height: 50
  },
  title: {
    color: "red",
    fontSize: 34,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "serif"
  },
  overlay: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  opaque: {
    opacity: 0.4,
    backgroundColor: "white",
  },
  mainContent: {
    flex: 1,
    overflow: "hidden"
  }
});
