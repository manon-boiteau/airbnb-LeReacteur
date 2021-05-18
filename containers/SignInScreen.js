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
  // const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/log_in

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        alert("Welcome in Airbnb app 🤗");
      } else if (response.status === 401) {
        alert("⛔️ Email or passwor dis wrong");
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
        <Text style={styles.h2}>Sign in</Text>
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
        {(!email || !password) && <Text>Please fill all fields</Text>}
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
            handleSubmit();
          }}
        />
        {/* <Text>{errorMessage}</Text> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account? Register</Text>
        </TouchableOpacity>
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
  h2: {
    fontSize: 24,
    textAlign: "center",
  },

  // Sign in form
  formHeader: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
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
    marginVertical: 40,
  },
});
