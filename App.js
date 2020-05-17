import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar } from "react-native-calendars";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Second")}
      />
    </View>
  );
}

function SecondScreen() {
  return (
    <View style={styles.container}>
      <Text>Second Screen</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        hideExtraDays={true}
        hideDayNames={true}
        theme={{
          calendarBackground: "#2195F2",
          arrowColor: "#fff",
          monthTextColor: "#fff",
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
