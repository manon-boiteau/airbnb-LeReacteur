// React & React Native - Imports
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";
// import LottieView from "lottie-react-native";

// Expo - Imports
import { StatusBar } from "expo-status-bar";
import { Entypo } from "@expo/vector-icons";

// Other packages - import
import axios from "axios";

// Colors - import
import colors from "../assets/colors";
const { mainPink, textDisabled } = colors;

export default function RoomScreen({ route }) {
  // States
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fullText, setFullText] = useState(false);

  // Request URL: "https://express-airbnb-api.herokuapp.com/rooms/:id"

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = route.params.id;
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );

        // console.log("=====>", response.data);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // Function for stars rating
  const displayStars = (val) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= val) {
        tab.push(
          <Entypo
            style={styles.iconStars}
            name="star"
            size={20}
            color="gold"
            key={i}
          />
        );
      } else {
        tab.push(
          <Entypo
            style={styles.iconStars}
            name="star"
            size={20}
            color={textDisabled}
            key={i}
          />
        );
      }
    }
    return tab;
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <ScrollView>
      <StatusBar style="dark" />
      <View style={styles.offersWrapper}>
        {/* Offer */}
        <View style={styles.offerImgWrapper}>
          <Image source={{ uri: data.photos[0].url }} style={styles.offerImg} />
          <View style={styles.offerPriceWrapper}>
            <Text style={styles.offerPrice}>{data.price} €</Text>
          </View>
        </View>

        <View style={[styles.wrapper, styles.offerDetailsWrapper]}>
          <View style={styles.offerDetailsBlocText}>
            <Text style={styles.h3}>{data.title}</Text>
            {/* Reviews */}
            <View style={styles.reviewsWrapper}>
              <View style={styles.iconStarsWrapper}>
                {displayStars(data.ratingValue)}
              </View>
              <Text style={[styles.lightGreyText, styles.reviewsText]}>
                {data.reviews} reviews
              </Text>
            </View>
          </View>
          {/* Avatar */}
          <View style={styles.avatarImgWrapper}>
            <Image
              source={{ uri: data.user.account.photo.url }}
              style={styles.avatarImg}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* Offer's description */}
        <View style={styles.wrapper}>
          <Text
            numberOfLines={!fullText ? 3 : null}
            onPress={() => {
              setFullText(!fullText);
            }}
          >
            {data.description}
          </Text>
        </View>
      </View>
      {/* Map */}
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Global rules
  wrapper: {
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },

  // Titles
  h3: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 15,
  },

  // Colors
  lightGreyText: {
    color: textDisabled,
  },

  // Loading
  loading: {
    flex: 1,
    justifyContent: "center",
  },

  // Offers
  offersWrapper: {
    marginBottom: 20,
  },
  // ----- img
  offerImgWrapper: {
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  offerImg: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  offerPriceWrapper: {
    backgroundColor: "black",
    width: 80,
    padding: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  offerPrice: {
    color: "white",
  },
  // ----- details
  offerDetailsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  offerDetailsBlocText: {
    width: "75%",
  },
  reviewsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStarsWrapper: {
    flexDirection: "row",
  },
  iconStars: {
    marginRight: 5,
  },
  reviewsText: {
    fontWeight: "600",
    fontSize: 14,
  },
  avatarImgWrapper: {
    width: "25%",
    alignItems: "flex-end",
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});
