import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Cards from './src/Cards';


export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.header}>
        <Text style={styles.title}>Rinder</Text>
      </View>
      <View style={styles.cardContainer}>
        <Cards />
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
  cardContainer: {
    flex: 1,
    overflow: "hidden"
  }
});
