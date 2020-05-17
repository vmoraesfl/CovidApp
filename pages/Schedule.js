import React from "react";
import { View } from "react-native";

export default function Schedule() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "red",
  },
  body: {
    flex: 10,
    backgroundColor: "dodgeblue",
  },
});
