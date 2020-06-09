import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar } from "react-native-calendars";
import TodayScreen from "./pages/TodayScreen";
import DetailScreen from "./pages/SeeDetails";
import PreventionScreen from "./pages/PreventionScreen";
import TesteScreen from "./pages/teste";

const myHtmlFile = require("./pages/localsite.html");

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>COVID 19</Text>

      <Button title="Today" onPress={() => navigation.navigate("Today")} />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Today" headerMode={"float"}>
        <Stack.Screen
          name="Today"
          component={TodayScreen}
          options={{ headerShown: false, headerTransparent: true }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="Prevention"
          component={PreventionScreen}
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        <Stack.Screen
          name="Teste"
          component={TesteScreen}
          options={{ headerTransparent: false, headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3B00AB",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
