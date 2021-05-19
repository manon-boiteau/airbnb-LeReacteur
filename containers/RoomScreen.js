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
  // States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Request URL: "https://express-airbnb-api.herokuapp.com/rooms/:id"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let id = route.params.id;
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );

        console.log("============", response.data);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <SafeAreaView>
      <StatusBar style="dark" />
      <View>
        <View>
          <Image
            source={{ uri: data.photos[0].url }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{data.price} €</Text>
        </View>

        <View>
          <View>
            <Text>{data.title}</Text>

            <View>
              <Entypo
                style={styles.iconStars}
                name="star"
                size={20}
                color="black"
              />
              <Entypo
                style={styles.iconStars}
                name="star"
                size={20}
                color="black"
              />
              <Entypo
                style={styles.iconStars}
                name="star"
                size={20}
                color="black"
              />
              <Entypo
                style={styles.iconStars}
                name="star"
                size={20}
                color="black"
              />
              <Entypo
                style={styles.iconStars}
                name="star"
                size={20}
                color="black"
              />
              <Text>{data.reviews} reviews</Text>
            </View>
            <View>
              <Image
                source={{ uri: data.user.account.photo.url }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
          <View>
            <Text>{data.description}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  //   return <Text>Hello</Text>;
}

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
    borderBottomColor: mainLightGrey,
    borderBottomWidth: 1,
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
});
