// React & React Native - import
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Expo - Imports
import * as ImagePicker from "expo-image-picker";
import { Ionicons, SimpleLineIcons, FontAwesome } from "@expo/vector-icons";

// Other packages - import
import axios from "axios";

// Components
import Input from "../components/Input";
import AreaInput from "../components/AreaInput";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

export default function ProfileScreen({ setToken, userToken, userId }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState();
  const [avatar, setAvatar] = useState();
  const [uploading, setUploading] = useState(false);

  // console.log("userId ", userId);
  // console.log("userToken ", userToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // ----- Acces to user's gallery
  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      // console.log(result);
      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    } else {
      alert("⛔️ Acces to gallery denied.");
      return;
    }
  };

  // ----- Acces to user's camera
  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        setAvatar(result.uri);
      }
    } else {
      alert("⛔️ Acces to camera denied.");
      return;
    }
  };

  // ----- Send avatar picture to backend
  const sendAvatar = async () => {
    const ext = avatar.split(".");
    // console.log(ext);
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: avatar,
        name: `user-avatar.${ext[ext.length - 1]}`,
        type: `image/${ext[ext.length - 1]}`,
      });

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  // Function to update user's informations
  // Request URL : https://express-airbnb-api.herokuapp.com/user/update
  // const handleUpdate = async () => {
  //   try {
  //     if (email || description || username) {
  //       const response = await axios.put(
  //         "https://express-airbnb-api.herokuapp.com/user/update",
  //         {
  //           email: email ? email : null,
  //           description: description ? description : null,
  //           username: username ? username : null,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );
  //       console.log("==========", response.data);
  //     }
  //   } catch (e) {
  //     console.log(e.message);
  //   }
  // };

  // Function to log out
  const handleLogout = () => {
    setToken(null);
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <ScrollView>
      <KeyboardAwareScrollView style={styles.body}>
        <View style={[styles.avatarWrapper, styles.wrapper]}>
          <View style={styles.avatar}>
            {avatar ? (
              <View>
                <Image
                  source={{ uri: avatar }}
                  style={styles.avatarImg}
                ></Image>
              </View>
            ) : (
              <View style={styles.emptyAvatar}>
                <FontAwesome name="user" size={110} color={mainLightGrey} />
              </View>
            )}
          </View>
          <View style={styles.uploadPic}>
            <SimpleLineIcons
              name="picture"
              size={26}
              color={mainDarkGrey}
              onPress={handleGallery}
            />
            <Ionicons
              name="camera"
              size={30}
              color={mainDarkGrey}
              onPress={handleCamera}
            />
          </View>
        </View>

        <View style={[styles.form, styles.wrapper]}>
          <Input
            // placeholder="email"
            value={!email ? data.email : email}
            setFunction={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={false}
          />
          <Input
            // placeholder="email"
            value={!username ? data.username : username}
            setFunction={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={false}
          />
          <AreaInput
            value={!description ? data.description : description}
            setFunction={setDescription}
            multiline={true}
          />
        </View>

        <View style={styles.formButtons}>
          {/* Update */}
          <TouchableOpacity
            style={[styles.btnWhite, styles.btnForm]}
            // onPress={async () => {
            //   handleUpdate();
            // }}
            onPress={sendAvatar}
          >
            <Text style={[styles.btnText, styles.greyText]}>Update</Text>
          </TouchableOpacity>

          {/* Log out */}
          <TouchableOpacity
            style={[styles.btnPink, styles.btnWhite]}
            onPress={async () => {
              handleLogout();
            }}
          >
            <Text style={[styles.btnText, styles.whiteText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Global rules
  body: {
    backgroundColor: "white",
  },
  wrapper: {
    width: "80%",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  // Loading
  loading: {
    flex: 1,
    justifyContent: "center",
  },

  // Colors
  whiteText: {
    color: "white",
  },

  // Button
  formButtons: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnWhite: {
    height: 60,
    width: "60%",
    borderColor: mainPink,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPink: {
    height: 60,
    width: "60%",
    borderColor: mainPink,
    backgroundColor: mainPink,
    borderWidth: 3,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  btnForm: {
    marginTop: 30,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: mainDarkGrey,
  },

  // Avatar
  avatarWrapper: {
    height: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
    borderWidth: 2,
    borderColor: mainPink,
  },
  emptyAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 20,
    borderWidth: 2,
    borderColor: mainPink,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadPic: {
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  form: {
    paddingTop: 30,
  },
});
