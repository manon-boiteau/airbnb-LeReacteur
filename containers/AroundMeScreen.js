// React & React Native - Imports
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

// Expo - Imports
// (Package for user's location authorization)
import * as Location from "expo-location";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink } = colors;

const AroundMeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Request URL with params: `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
    // Request URL with NO params: "https://express-airbnb-api.herokuapp.com/rooms/around"

    const getPermissionAndLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log("status ", status);
        // { status } = destructuring of result.status

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          const result = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitude}&longitude=${longitude}`
          );
          // console.log("-----> result.data ", result.data);
          setResults(result.data);
          setLoading(false);
        } else {
          // alert("⛔️ Acces unauthorized.");
          const result = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
          // console.log("-----> result.data ", result.data);
          setResults(result.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getPermissionAndLocation();
  }, []);

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude ? latitude : 48.856614,
        longitude: longitude ? longitude : 2.3522219,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
    >
      {results.map((el, index) => {
        // console.log(el);
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: el.location[1],
              longitude: el.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  // Loading
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  // Map
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
