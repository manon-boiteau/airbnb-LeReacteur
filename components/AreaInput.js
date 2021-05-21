// React & React Native - Imports
import React from "react";
import { TextInput, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { mainPink } = colors;

const AreaInput = ({ placeholder, setFunction, multiline, value }) => {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setFunction(text);
      }}
      multiline={multiline}
    />
  );
};

export default AreaInput;

const styles = StyleSheet.create({
  textArea: {
    height: 100,
    width: "100%",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: mainPink,
  },
});
