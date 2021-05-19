import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, mainDarkGrey, mainLightGrey, textDisabled } = colors;

// Icons - import
import { Entypo } from "@expo/vector-icons";

export default function RoomScreen({ navigation, route }) {
  console.log("*******", route);
  //     // States
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);

  // // Request URL: "https://express-airbnb-api.herokuapp.com/rooms/:id"
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `https://express-airbnb-api.herokuapp.com/rooms/${}`
  //       );

  //       console.log("=====", response.data);
  //       setData(response.data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const navigation = useNavigation();

  // return loading ? (
  //   <View style={styles.loading}>
  //     <ActivityIndicator size="large" color={mainPink} />
  //   </View>
  // ) : ()
  return <Text>Hello</Text>;
}

// const styles = StyleSheet.create({
// )}
