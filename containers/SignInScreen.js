import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/log_in

  const handleSubmit = async () => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        console.log("response ", response);
      } else {
        setErrorMessage("Please fill all fields.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formHeader}>
        <Image
          style={styles.imgLogo}
          source={require("../assets/airbnb-logo.png")}
          resizeMode="contain"
        />
        <Text style={[styles.h2, styles.greyText]}>Sign in</Text>
      </View>

      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[styles.btnWhite, styles.btnForm]}
            onPress={async () => {
              handleSubmit();
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={[styles.btnText, styles.greyText]}>Sign in</Text>
          </TouchableOpacity>
          <Text>{errorMessage && errorMessage}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.greyText}>No account? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// CSS down below
const styles = StyleSheet.create({
  // Global rules
  wrapper: {
    width: "80%",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  // Titles
  h2: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "600",
  },

  // ----- Colors
  greyText: {
    color: "#7D7D7D",
  },

  // ----- Buttons
  btnWhite: {
    height: 60,
    width: "60%",
    borderColor: "#EB5A62",
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
  },

  // Sign in form
  formHeader: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20,
  },
  imgLogo: {
    width: 80,
    height: 100,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#EB5A62",
    borderWidth: 2,
    marginBottom: 30,
  },
  formButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnForm: {
    marginTop: 100,
    marginBottom: 20,
  },
});
