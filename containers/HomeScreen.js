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
  TouchableOpacity,
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

export default function HomeScreen() {
  // States
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // Request URL: "https://express-airbnb-api.herokuapp.com/rooms"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        console.log("=====", response.data);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  const navigation = useNavigation();

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={mainPink} />
    </View>
  ) : (
    <SafeAreaView>
      <StatusBar style="dark" />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={(item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              {/* <Text>{item.item._id}</Text> */}
              <View style={[styles.wrapper, styles.offersWrapper]}>
                <View style={styles.offerImgWrapper}>
                  <Image
                    source={{ uri: item.item.photos[0].url }}
                    style={styles.offerImg}
                    resizeMode="cover"
                  />
                  <View style={styles.offerPriceWrapper}>
                    <Text style={styles.offerPrice}>{item.item.price} €</Text>
                  </View>
                </View>

                <View style={styles.offerDetailsWrapper}>
                  <View style={styles.offerDetailsBlocText}>
                    <Text
                      style={styles.h3}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.item.title}
                    </Text>
                    <View style={styles.reviewsWrapper}>
                      <View style={styles.iconStarsWrapper}>
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
                      </View>
                      <Text style={[styles.lightGreyText, styles.reviewsText]}>
                        {item.item.reviews} reviews
                      </Text>
                    </View>
                  </View>
                  <View style={styles.avatarImgWrapper}>
                    <Image
                      source={{ uri: item.item.user.account.photo.url }}
                      style={styles.avatarImg}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {/* <Text>Welcome home!</Text>
        <Button
          title="Go to Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: 123 });
          }}
        /> */}
    </SafeAreaView>
  );
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
