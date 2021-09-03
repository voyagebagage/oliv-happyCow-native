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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type, color, handleColors } from "../components/lib";

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
  // console.log(route.params, "RESCOLOR");
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

  // console.log(hours, "derniere");
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
          <View style={styles.smallPicBottomV}>
            <Image
              style={styles.smallPicBottom}
              source={{ uri: restaurant.pics[2] }}
            />
            <Text style={styles.onTopTextPhoto}>+{restaurant.pics.length}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.headerInfo, { backgroundColor: restaurant.color }]}>
        <Text>{restaurant.name}</Text>
        <Text>{restaurant.rating}</Text>
        <Text>{restaurant.color}</Text>
      </View>
      <View style={styles.callToActions}></View>
      <View style={styles.descriptionV}>
        <Text style={styles.descriptionT}>{restaurant.description}</Text>
      </View>
      {/* //----------------------------------+++++++++++++++++++++++++++++++++------------------------------- */}
      <View style={styles.detailV}>
        <Text style={styles.detailT}>{restaurant.address}</Text>
      </View>
      <View style={styles.detailV}>
        <Text style={styles.detailT}>HOURS={hours}</Text>
      </View>
      <TouchableOpacity style={styles.detailV}>
        <Text style={styles.detailT}>{restaurant.phone}</Text>
      </TouchableOpacity>
      {restaurant.fb && (
        <TouchableOpacity
          style={styles.detailV}
          onPress={() => Linking.openURL(restaurant.fb)}
        >
          <Text style={styles.detailT}>Facebook</Text>
        </TouchableOpacity>
      )}
      {restaurant.website && (
        <TouchableOpacity
          style={styles.detailV}
          onPress={() => Linking.openURL(restaurant.website)}
        >
          <Text style={styles.detailT}>Website</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.detailV}>
        <Text style={styles.detailT}>Directions</Text>
      </TouchableOpacity>
      <View style={styles.detailV}>
        <Text style={styles.detailT}>Reviews</Text>
      </View>
      <TouchableOpacity style={styles.detailV}>
        <Text style={styles.detailT}>STARS</Text>
      </TouchableOpacity>

      <Button title={"add Yummies"} onPress={() => save(restaurant)} />
      <Button title={"remove Yummies"} onPress={() => removeRes()} />
      <Button title={"CLEAR"} onPress={() => clearAsyncStorage()} />
    </ScrollView>
  ) : null;
}
export default React.memo(RestaurantScreen);
const styles = StyleSheet.create({
  detailT: { color: "white" },
  detailV: {
    height: wHeight * 0.06,
    width: wWidth,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    // borderWidth: 3,
    backgroundColor: drawerGrey,
  },
  descriptionT: { color: "white" },
  descriptionV: {
    height: wHeight * 0.31,
    width: wWidth,
    // borderWidth: 1,
    backgroundColor: drawerGrey,
  },
  callToActions: {
    height: wHeight * 0.103,
    width: wWidth,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    // borderWidth: 3,
    backgroundColor: drawerGrey,
  },
  headerInfo: {
    height: wHeight * 0.11,
    width: wWidth,
  },
  onTopTextPhoto: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 36,
    // justifyContent: "center",
    alignSelf: "center",
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
    // alignItems: "center",
  },
  smallPicBottom: {
    marginRight: wWidth * 0.746,
    // width: wWidth * 0.264,
    height: wHeight * 0.125,
    // resizeMode: "center",
    borderWidth: 10,
  },
  smallPic: {
    flexDirection: "column",
    borderLeftWidth: 2,
    borderLeftColor: "white",
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
    color: "white",
    fontWeight: "bold",
  },
});
