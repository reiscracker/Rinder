import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, TouchableOpacity, StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cards from './src/Cards';
import ItsAMatch from "./src/ItsAMatch";
import Chat from "./src/chat/Chat";

const Stack = createNativeStackNavigator();

function CardsScreen({ navigation }) {
  const [match, setMatch] = useState(null);
  return (
    <View style={[styles.mainContent, styles.cardsScreen]}>
      {match && <>
        <TouchableOpacity style={[styles.overlay]} onPress={() => { setMatch(null); }}></TouchableOpacity>
        <View style={styles.modal}>
          <ItsAMatch imageSource={match.image} onChatPress={() => { navigation.navigate("Chat", { match }); setMatch(null); }} onCancelPress={() => setMatch(null)} />
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
      <Chat profileResponses={match.responses} />
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.app}>
        <Stack.Navigator
          initialRouteName="Cards"
          screenOptions={{ headerTintColor: "red", headerTitleAlign: "center" }}
        >
          <Stack.Screen name="Cards" component={CardsScreen}
            options={{
              title: "Rinder",
              headerTitleStyle: { fontWeight: "bold", fontSize: 36 }
            }}
          />
          <Stack.Screen name="Chat" component={ChatScreen}
            options={({ route }) => ({
              title: `Chat mit ${route.params.match.name}`,
              headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
              headerRight: () => <Image source={route.params.match.image} style={styles.roundIcon} />
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
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 50,
    // paddingHorizontal: 30
    opacity: 0.6,
    backgroundColor: "#aaa",
  },
  modal: {
    zIndex: 100,
    position: "absolute",
    top: 50,
    right: 30,
    bottom: 100,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    overflow: "hidden"
  },
  cardsScreen: {
    paddingBottom: 50,
  },
  roundIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
  }
});
