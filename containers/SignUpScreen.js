// React & React Native - import
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

// Components - import

export default function SignUpScreen({ setToken }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/sign_up

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (email && username && description && password && confirmPassword) {
        // setDisableBtn(false);
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
          // console.log("response.data ", response.data);
          // console.log("response.data.token ", response.data.token);

          if (response.data.token) {
            const userToken = response.data.token;
            setToken(userToken);
            // alert("Welcome sunshine ☀️");
          }
        } else {
          setErrorMessage("⛔️ Passwords are not the same.");
        }
        setLoading(false);
      } else {
        setErrorMessage("⛔️ Please fill all fields.");
      }
    } catch (error) {
      console.log(error.response.data.error);
      if (
        error.response.data.error === "This email already has an account." ||
        error.response.data.error === "This username already has an account."
      ) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred.");
      }
    }
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
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
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              autoCapitalize="none"
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
                color={mainLightGrey}
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
                color={mainLightGrey}
              />
            </View>

            <View style={styles.formButtons}>
              {email &&
              username &&
              description &&
              password &&
              confirmPassword ? (
                <TouchableOpacity
                  disabled={!disabled}
                  style={[styles.btnWhite, styles.btnForm]}
                  onPress={async () => {
                    handleSubmit();
                  }}
                >
                  <Text style={[styles.btnText, styles.greyText]}>Sign up</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={disabled}
                  style={[styles.btnDisabled, styles.btnForm]}
                  onPress={async () => {
                    handleSubmit();
                  }}
                >
                  <Text style={[styles.btnText, styles.btnTextDisabled]}>
                    Sign up
                  </Text>
                </TouchableOpacity>
              )}

              <Text style={styles.errorMsg}>
                {errorMessage && errorMessage}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={[styles.greyText, styles.formRedirect]}>
                  Already have an account? Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

// CSS down below
const styles = StyleSheet.create({
  // Global rules
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
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
    color: mainDarkGrey,
  },

  // ----- Buttons
  btnWhite: {
    height: 60,
    width: "60%",
    borderColor: mainPink,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
  },
  btnDisabled: {
    backgroundColor: mainLightGrey,
    height: 60,
    width: "60%",
    borderColor: mainLightGrey,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextDisabled: {
    color: textDisabled,
  },

  // Loading
  loading: {
    flex: 1,
    justifyContent: "center",
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
    borderBottomColor: mainPink,
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
    borderTopColor: mainPink,
    borderRightColor: mainPink,
    borderLeftColor: mainPink,
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
    color: mainPink,
  },
});
