// React & React Native - import
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Expo - Imports
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

// Components - import
import Logo from "../components/Logo";
import TitleH2 from "../components/TitleH2";
import Input from "../components/Input";
import AreaInput from "../components/AreaInput";

export default function SignUpScreen({ setToken }) {
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
    try {
      if (email && username && description && password && confirmPassword) {
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
            const userId = response.data.id;
            setToken(userToken, userId);
          }
        } else {
          setErrorMessage("⛔️ Passwords are not the same.");
        }
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

  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <KeyboardAwareScrollView>
          <View style={styles.formHeader}>
            <Logo />
            <TitleH2 title="Sign Up" />
          </View>

          <View style={styles.wrapper}>
            <Input
              placeholder="email"
              value={email}
              setFunction={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry={false}
            />
            <Input
              placeholder="username"
              value={username}
              setFunction={setUsername}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={false}
            />
            <AreaInput
              placeholder="Describe yourself in a few words..."
              value={description}
              placeholder="Describe yourself in a few words..."
              setFunction={setDescription}
              multiline={true}
            />
            <View style={styles.iconEyeWrapper}>
              <Input
                placeholder="password"
                value={password}
                setFunction={setPassword}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
              />
              {/* <Ionicons
                style={styles.iconEye}
                name="eye"
                size={28}
                color={mainLightGrey}
              /> */}
            </View>

            <View style={styles.iconEyeWrapper}>
              <Input
                placeholder="confirm password"
                value={confirmPassword}
                setFunction={setConfirmPassword}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
              />
              {/* <Ionicons
                style={styles.iconEye}
                name="eye"
                size={28}
                color={mainLightGrey}
              /> */}
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

  // ----- Colors
  greyText: {
    color: mainDarkGrey,
  },

  // ----- Buttons
  // btnWhite: {
  //   height: 60,
  //   width: "60%",
  //   borderColor: mainPink,
  //   borderWidth: 3,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // btnText: {
  //   fontSize: 18,
  //   fontWeight: "600",
  // },
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
  iconEyeWrapper: {
    position: "relative",
  },
  iconEye: {
    position: "absolute",
    right: 0,
  },
  formButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  // btnForm: {
  //   marginTop: 30,
  //   marginBottom: 20,
  // },
  formRedirect: {
    marginBottom: 50,
  },
  errorMsg: {
    marginBottom: 20,
    color: mainPink,
  },
});
