import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calendar, Agenda } from "react-native-calendars";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Calendar")}
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

let df = function DayPressHandler(day) {
  console.log("selected day", day.dateString);
  return day.dateString;
};

function CalendarScreen() {
  const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
  const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
  const workout = { key: "workout", color: "green" };
  return (
    <View style={styles.container}>
      <Calendar
        markedDates={{
          "2020-05-25": {
            //dots: [massage],
            selected: true,
            selectedColor: "green",
          },
        }}
        markingType={"multi-dot"}
        onChange={console.log("oi")}
        onDayPress={DayPressHandler}
        minDate={new Date(2018, 3, 20)}
        startDate={new Date(2020, 3, 30)}
        endDate={new Date(2022, 4, 5)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 400,
        }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "blue",
          indicatorColor: "blue",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
}

function AgendaScreen() {
  return (
    <View>
      <Agenda>
        items=
        {{
          "2012-05-22": [{ name: "item 1 - any js object" }],
          "2012-05-23": [{ name: "item 2 - any js object", height: 80 }],
          "2012-05-24": [],
          "2012-05-25": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        loadItemsForMonth=
        {(month) => {
          console.log("trigger items loading");
        }}
      </Agenda>
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
        <Stack.Screen name="Agenda" component={AgendaScreen} />
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
