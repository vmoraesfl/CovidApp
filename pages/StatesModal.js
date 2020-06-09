import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

function GoalInput(props) {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          placeholderTextColor="purple"
          style={styles.textinput}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#c1df",
    justifyContent: "center",
    alignItems: "center",
    //borderColor: "tomato",
    //borderWidth: 1, //Borda para facilitar a compreensão do conceito flexbox
  },
  button: {
    width: "40%",
    //justifyContent: "center",
    //alignContent: "center",
  },
  textinput: {
    borderColor: "purple",
    borderWidth: 2,
    height: 55,
    width: "80%",
    padding: 20,
    marginBottom: 10,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default GoalInput;
