import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cards from './src/Cards';
import ItsAMatch from "./src/ItsAMatch";
import ChatScreenHeader from "./src/ChatScreenHeader";
import Chat from "./src/Chat";

const Stack = createNativeStackNavigator();

function CardsScreen({ navigation }) {
  const [match, setMatch] = useState(null);
  return (
    <View style={[styles.mainContent, styles.cardsScreen]}>
      {match && <>
        <View style={[styles.overlay, styles.opaque]}></View>
        <View style={styles.overlay}>
          <ItsAMatch imageSource={match.image} onChatPress={() => { navigation.navigate("Chat", { match }) }} onCancelPress={() => setMatch(null)} />
        </View>
      </>}
      <Cards onMatch={matched => setMatch(matched)} />
    </View>
  );
}

function ChatScreen({ route }) {
  const { match } = route.params;

  return (
    <View style={styles.mainContent}>
      <Chat responses={["Hi Na", "Ich bin ganz saftig"]} />
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.app}>
        <Stack.Navigator initialRouteName="Cards">
          <Stack.Screen name="Cards" component={CardsScreen} options={{ title: "Rinder" }} />
          <Stack.Screen name="Chat" component={ChatScreen}
            options={({ route }) => ({
              headerTitle: () => <ChatScreenHeader {...route.params.match} />
            })}
          />
        </Stack.Navigator>
        <ExpoStatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
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
    bottom: 50,
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
  },
  cardsScreen: {
    paddingBottom: 50,
  }
});
