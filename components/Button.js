// React & React Native - Imports
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ disabled, setFunction }) => {
  return (
    <TouchableOpacity
      disabled={!disabled}
      style={[styles.btnWhite, styles.btnForm]}
      onPress={async () => {
        handleSubmit();
      }}
    >
      <Text style={styles.btnText}>Sign up</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnWhite: {
    height: 60,
    width: "60%",
    borderColor: mainPink,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnForm: {
    marginTop: 30,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: mainDarkGrey,
  },
});
