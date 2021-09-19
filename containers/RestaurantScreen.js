import React, { useState, useEffect } from "react";

import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { Rating } from "react-native-ratings";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { type, color, handleColors } from "../components/lib";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Dimensions } from "react-native";
const wWidth = Dimensions.get("window").width;
const wHeight = Dimensions.get("window").height;

import colors from ".././assets/colors";
const { drawerGrey, greenFltr, purpleFltr, redFltr } = colors;
function RestaurantScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  favRestaurants,
  setFavRestaurants,
}) {
  const restaurant = route.params;
  console.log(restaurant.pics, "RESCOLOR");
  const ratingCompleted = (rating) => {
    console.log("How do you rate this place: " + rating);
  };
  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem("favorites");
        const storedRes = JSON.parse(stored);
        if (storedRes !== null) {
          let newTab = [...storedRes];
          setFavRestaurants(newTab);
          // favRestaurants.push(newTab);
          setIsLoading(false);
        }
        console.log([favRestaurants]);
      } catch (error) {
        console.log("Failed to load !");
      }
      console.log("Done.");
    };
    load();
  }, [restaurant]);

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    setFavRestaurants([]);
    console.log("clear");
  };
  const save = async (restaurant) => {
    try {
      let newTab = [...favRestaurants];
      let alreadyInAsybcStorage = false;
      newTab.forEach((e) => {
        if (e.id === restaurant.id) {
          alreadyInAsybcStorage = true;
        }
      });

      if (alreadyInAsybcStorage) {
        alert("nope already Fave");
      } else {
        newTab.push(restaurant);
        favRestaurants.push(restaurant);

        const stringFav = JSON.stringify(favRestaurants);

        await AsyncStorage.setItem("favorites", stringFav);
        alert("succes update");
      }
    } catch (error) {
      console.log("-------------you got a saving issue!-----------");
    }
    console.log("Done.");
  };
  const removeRes = async () => {
    try {
      let newTab = [...favRestaurants];
      let alreadyInAsybcStorage = false;
      for (let index = 0; index < newTab.length; index++) {
        if (newTab[index].id === restaurant.id) {
          alreadyInAsybcStorage = true;
          favRestaurants.splice(index, 1);
        }
      }
      if (!alreadyInAsybcStorage) {
        alert("NOT in Fave");
      } else {
        const stringFav = JSON.stringify(favRestaurants);
        await AsyncStorage.setItem("favorites", stringFav);
        alert("succes remove");
      }
    } catch (error) {
      console.log("-----------remove failed-----------");
    }
    console.log("-------------REMOVED-----------");
  };
  //<<<<<<<<<<<<<<<<<<<---------Opening hours---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>
  let hours = restaurant.description.split("Open ").pop().split(".")[0];
  let description = restaurant.description.slice(
    0,
    restaurant.description.lastIndexOf("Open ")
  );
  console.log(description, "derniere");
  //<<<<<<<<<<<<<<<<<<<------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return !isLoading ? (
    <ScrollView style={styles.mainView}>
      <View style={styles.photos}>
        <Image style={styles.bigPic} source={{ uri: restaurant.pics[0] }} />
        <View style={styles.smallPic}>
          <Image
            style={styles.smallPicTop}
            source={{ uri: restaurant.pics[1] }}
          />
          <TouchableOpacity
            style={styles.smallPicBottomV}
            onPress={() =>
              navigation.navigate("Photos", {
                pics: restaurant.pics,
              })
            }
          >
            <Image
              style={styles.smallPicBottom}
              source={{ uri: restaurant.pics[2] }}
            />
            <Text style={styles.onTopTextPhoto}>+{restaurant.pics.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.headerInfo, { backgroundColor: restaurant.color }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Rating
            type="custom"
            ratingColor="gold"
            imageSize={wWidth * 0.045}
            tintColor={restaurant.color}
            ratingTextColor="gold"
            ratingBackgroundColor="rgba(255,255,255,0.3)"
            startingValue={restaurant.rating}
            onFinishRating={ratingCompleted}
            style={{
              marginLeft: wWidth * 0.025,
              marginTop: -wHeight * 0.01,
            }}
          />
          <View style={styles.openingV}>
            <Text style={styles.openingT}>
              <MaterialCommunityIcons
                name="clock-time-four-outline"
                size={16}
                color="white"
              />
              OPEN
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.restaurantName}>{restaurant.type}</Text>
        </View>
      </View>

      <View style={styles.callToActions}>
        <View style={styles.callToActionsV}>
          <Ionicons name="ios-pencil" size={34} color="grey" />
          <Text style={styles.callToActionsT}>ADD REVIEW</Text>
        </View>
        <View style={styles.callToActionsV}>
          <MaterialCommunityIcons name="camera-plus" size={36} color="grey" />
          <Text style={styles.callToActionsT}>ADD PHOTO</Text>
        </View>
        <View style={styles.callToActionsV}>
          <MaterialIcons name="local-phone" size={36} color="grey" />
          <Text style={styles.callToActionsT}>CALL</Text>
        </View>
      </View>
      <View style={styles.descriptionV}>
        <Text style={styles.descriptionT}>{description}</Text>
      </View>
      {/* //----------------------------------+++++++++++++++++++++++++++++++++------------------------------- */}
      <View style={styles.detailV}>
        <Text style={styles.detailT}>{restaurant.address}</Text>
      </View>
      <View style={styles.detailV}>
        <MaterialCommunityIcons
          name="clock-time-four-outline"
          size={24}
          color="white"
        />
        <Text style={(styles.detailTHours, styles.detailT)}>HOURS</Text>
        <Text style={styles.detailTTime}>{hours}</Text>
      </View>
      <TouchableOpacity style={styles.detailV}>
        <MaterialIcons name="local-phone" size={24} color="white" />
        <Text style={styles.detailT}>CALL</Text>

        <Text style={styles.detailT}>{restaurant.phone}</Text>
      </TouchableOpacity>
      {restaurant.fb && (
        <TouchableOpacity
          style={styles.detailV}
          onPress={() => Linking.openURL(restaurant.fb)}
        >
          <FontAwesome name="facebook-official" size={24} color="white" />
          <Text style={styles.detailT}>Facebook</Text>
        </TouchableOpacity>
      )}
      {restaurant.website && (
        <TouchableOpacity
          style={styles.detailV}
          onPress={() => Linking.openURL(restaurant.website)}
        >
          <MaterialCommunityIcons name="web" size={24} color="white" />
          <Text style={styles.detailT}>Website</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.detailV}>
        <MaterialIcons name="directions" size={24} color="white" />
        <Text style={styles.detailT}>Directions</Text>
      </TouchableOpacity>
      <View style={styles.detailV}>
        <Text style={styles.detailT}>Reviews</Text>
      </View>
      <View
        style={
          (styles.detailV,
          { flexDirection: "column", paddingHorizontal: wWidth * 0.225 })
        }
      >
        <Text style={styles.detailT}>How do you rate this place ?</Text>
        <Rating
          type="custom"
          ratingColor="gold"
          defaultRating={0}
          tintColor={drawerGrey} //
          ratingTextColor="white"
          ratingBackgroundColor="rgba(255,255,255,0.3)"
          startingValue={0}
          onFinishRating={ratingCompleted}
          style={{
            paddingVertical: 10,
          }}
        />
      </View>

      <Button title={"add Yummies"} onPress={() => save(restaurant)} />
      <Button title={"remove Yummies"} onPress={() => removeRes()} />
      {/* <Button title={"CLEAR"} onPress={() => clearAsyncStorage()} /> */}
    </ScrollView>
  ) : null;
}
export default React.memo(RestaurantScreen);
const styles = StyleSheet.create({
  detailTHours: {},
  detailT: {
    color: "white",
    paddingLeft: wWidth * 0.1,
    fontWeight: "bold",
    // justifyContent: "flex-start"
  },
  detailTTime: { color: "grey", paddingLeft: wWidth * 0.05 },
  detailV: {
    height: wHeight * 0.06,
    width: wWidth,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    // borderWidth: 3,
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: drawerGrey,
    paddingHorizontal: wWidth * 0.03,
  },
  descriptionT: {
    color: "white",
    textAlign: "left",
    fontSize: 16,
    paddingHorizontal: wWidth * 0.03,
    paddingVertical: wHeight * 0.03,
    letterSpacing: 0.2,
    lineHeight: 25,
  },
  descriptionV: {
    // height: wHeight * 0.31,
    width: wWidth,
    // borderWidth: 1,
    backgroundColor: drawerGrey,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  callToActions: {
    height: wHeight * 0.103,
    width: wWidth,
    // marginRight: 0,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    flexDirection: "row",
    backgroundColor: drawerGrey,
    justifyContent: "space-around",
    alignItems: "center",
  },
  callToActionsV: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: wHeight * 0.13,
    marginLeft: -wWidth * 0.07,
    // borderWidth: 1,
  },
  callToActionsT: {
    color: "white",
    fontWeight: "600",
    marginTop: wHeight * 0.015,
  },
  //================================----------------------
  restaurantName: {
    color: "white",
    padding: wWidth * 0.03,
    fontSize: 18,
    fontWeight: "500",
  },
  headerInfo: {
    height: wHeight * 0.11,
    width: wWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: { alignItems: "flex-start" },
  headerRight: {},
  openingV: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,

    marginLeft: wWidth * 0.03,
    marginTop: wHeight * 0.006,
    // justifyContent: "space-between",
  },
  openingT: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 3,
    width: wWidth * 0.18,

    justifyContent: "space-between",
  },
  onTopTextPhoto: {
    position: "absolute",
    color: "white",
    fontWeight: "500",
    fontSize: 36,
    justifyContent: "flex-end",
    marginLeft: wWidth * 0.05,

    // alignSelf: "center",
  },
  smallPicTop: {
    marginRight: wWidth * 0.746,
    width: wWidth * 0.264,
    height: wHeight * 0.125,
    // resizeMode: "center",
  },
  smallPicBottomV: {
    borderTopWidth: 2,
    borderTopColor: "white",
    justifyContent: "center",
    // textAlign: "center",
    minHeight: wHeight * 0.12,
    backgroundColor: "black",

    // alignItems: "center",
    // alignSelf: "center",
  },
  smallPicBottom: {
    marginRight: wWidth * 0.746,
    // width: wWidth * 0.264,
    height: wHeight * 0.125,
    opacity: 0.6,
    // zIndex: 10,
    // alignSelf: "center",
    // resizeMode: "center",
    // borderWidth: 10,
  },
  smallPic: {
    flexDirection: "column",
    borderLeftWidth: 2,
    borderLeftColor: "white",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  bigPic: {
    width: wWidth * 0.746,
    height: "100%",
    // borderWidth: 1,
    resizeMode: "cover",
  },
  photos: {
    // paddingTop: 0,
    height: wHeight * 0.25,
    width: wWidth,
    flexDirection: "row",
    // borderWidth: 1,
  },
  mainView: {
    // color: "white",
    fontWeight: "bold",
    backgroundColor: drawerGrey,
  },
});
