// React & React Native - Imports
import React from "react";
import { TextInput, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { mainPink } = colors;

const Input = ({
  placeholder,
  value,
  keyboardType,
  autoCapitalize,
  setFunction,
  secureTextEntry,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => {
        setFunction(text);
      }}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: mainPink,
    borderWidth: 2,
    marginBottom: 30,
  },
});
