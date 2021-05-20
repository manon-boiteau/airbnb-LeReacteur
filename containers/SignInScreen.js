// React & React Native - import
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

// Components - import
import Logo from "../components/Logo";
import TitleH2 from "../components/TitleH2";
import Input from "../components/Input";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/log_in

  const handleSubmit = async () => {
    try {
      if (email && password) {
        setDisabled(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        if (response.status === 200) {
          const userToken = response.data.token;
          setToken(userToken);
        } else {
          setErrorMessage("😕 Email or password is wrong.");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formHeader}>
        <Logo />
        <TitleH2 title="Sign In" />
      </View>

      <View style={styles.wrapper}>
        <Input
          placeholder="email"
          setFunction={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={false}
        />

        <View style={styles.iconEyeWrapper}>
          <Input
            placeholder="password"
            setFunction={setPassword}
            value={password}
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
          {email && password ? (
            <TouchableOpacity
              disabled={!disabled}
              style={[styles.btnWhite, styles.btnForm]}
              onPress={async () => {
                setDisabled(false);
                handleSubmit();
              }}
            >
              <Text style={[styles.btnText, styles.greyText]}>Sign in</Text>
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
                Sign in
              </Text>
            </TouchableOpacity>
          )}

          <Text style={styles.errorMsg}>{errorMessage && errorMessage}</Text>

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

  iconEye: {
    position: "absolute",
    right: 0,
  },
  formButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnForm: {
    marginTop: 100,
    marginBottom: 20,
  },
  errorMsg: {
    marginBottom: 20,
    color: mainPink,
  },
});
