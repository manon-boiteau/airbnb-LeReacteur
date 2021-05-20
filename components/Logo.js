import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return (
    <Image
      style={styles.imgLogo}
      source={require("../assets/airbnb-logo.png")}
      resizeMode="contain"
    />
  );
};

export default Logo;

const styles = StyleSheet.create({
  imgLogo: {
    width: 80,
    height: 100,
    marginBottom: 20,
  },
});
