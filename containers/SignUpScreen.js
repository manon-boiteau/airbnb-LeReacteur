import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Request URL: https://express-airbnb-api.herokuapp.com/user/sign_up

  const handleSubmit = async () => {
    const response = await axios.post(
      "https://express-airbnb-api.herokuapp.com/user/sign_up",
      {
        email: email,
        username: username,
        description: description,
        password: password,
      }
    );
    console.log(response.data);
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formHeader}>
        <Image
          style={styles.imgLogo}
          source={require("../assets/airbnb-logo.png")}
          resizeMode="contain"
        />
        <Text style={[styles.h2, styles.greyText]}>Sign up</Text>
      </View>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe yourself in a few words..."
          multiline
          numberOfLines={4}
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
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
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
        />
        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[styles.btnWhite, styles.btnForm]}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
            <Text style={[styles.btnText, styles.greyText]}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={styles.greyText}>
              Already have an account? Sign in
            </Text>
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
  textArea: {
    height: 100,
    width: "100%",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderTopColor: "#EB5A62",
    borderRightColor: "#EB5A62",
    borderLeftColor: "#EB5A62",
  },
  formButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnForm: {
    marginTop: 50,
    marginBottom: 20,
  },
});
