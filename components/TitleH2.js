// React & React Native - Imports
import React from "react";
import { Text, StyleSheet } from "react-native";

// Colors - import
import colors from "../assets/colors";
const { mainDarkGrey } = colors;

const TitleH2 = ({ title }) => {
  return <Text style={styles.h2}>{title}</Text>;
};

export default TitleH2;

const styles = StyleSheet.create({
  h2: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
    color: mainDarkGrey,
  },
});
