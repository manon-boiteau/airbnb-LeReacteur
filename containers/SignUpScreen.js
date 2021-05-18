import React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [disableBtn, setDisableBtn] = useState(true);

  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/sign_up

  const handleSubmit = async () => {
    try {
      if (email && username && description && password) {
        setDisableBtn(false);
        if (password === confirmPassword) {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log("response ", response);
          console.log("response.data ", response.data);
          console.log("response.data.token ", response.data.token);

          const userToken = response.data.token;
          setToken(userToken);
          alert("Welcome sunshine ☀️");
        } else {
          setErrorMessage("⛔️ Passwords are not the same.");
        }
      } else {
        setErrorMessage("⛔️ Please fill all fields.");
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
        <View style={styles.iconEyeWrapper}>
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <Ionicons
            style={styles.iconEye}
            name="eye"
            size={28}
            color="#D3D3D3"
          />
        </View>

        <View style={styles.iconEyeWrapper}>
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          />
          <Ionicons
            style={styles.iconEye}
            name="eye"
            size={28}
            color="#D3D3D3"
          />
        </View>

        <View style={styles.formButtons}>
          <TouchableOpacity
            disable={false}
            style={[styles.btnWhite, styles.btnForm]}
            onPress={async () => {
              handleSubmit();
            }}
          >
            <Text style={[styles.btnText, styles.greyText]}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.errorMsg}>{errorMessage && errorMessage}</Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Text style={[styles.greyText, styles.formRedirect]}>
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
  // btnDisable: {
  //   height: 60,
  //   width: "60%",
  //   borderColor: "#D3D3D3",
  //   borderWidth: 3,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },

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
  iconEyeWrapper: {
    position: "relative",
  },
  iconEye: {
    position: "absolute",
    right: 0,
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
    marginTop: 30,
    marginBottom: 20,
  },
  formRedirect: {
    marginBottom: 50,
  },
  errorMsg: {
    marginBottom: 20,
    color: "#EB5A62",
  },
});
