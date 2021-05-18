// React & React Native - import
import React from "react";
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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

export default function SignInScreen({ setToken }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  // Request URL: https://express-airbnb-api.herokuapp.com/user/log_in

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
          alert("Hello sunshine ☀️");
        } else {
          setErrorMessage("😕 Email or password is wrong.");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
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
          {/* <FontAwesome.Button
            style={styles.iconEye}
            name="eye"
            color="#D3D3D3"
            backgroundColor="transparent"
          ></FontAwesome.Button> */}
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
