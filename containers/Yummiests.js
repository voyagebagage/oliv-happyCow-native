import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import FlatListContents from "../components/FlatlistContents";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import colors from "../assets/colors";
const { drawerGrey, lightGrey } = colors;

function YummiestsScreen({ navigation, favRestaurants, setFavRestaurants }) {
  const removeYum = async () => {
    try {
      await AsyncStorage.removeItem("oneRestaurant");
    } catch (error) {
      console.log("remove failed");
    }
  };
  return (
    <View style={{ backgroundColor: drawerGrey, flex: 1 }}>
      {/* <Text style={{ color: "white", height: 24 }}>
        {favRestaurants.length}
      </Text> */}
      <FlatList
        // style={{ borderWidth: 2, borderColor: "blue" }}
        data={favRestaurants}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                style={[styles.flatList, { backgroundColor: item.color }]}
                onPress={() =>
                  navigation.navigate("Restaurant", {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    rating: item.rating,
                    thumbnail: item.thumbnail,
                  })
                }
              >
                <Image
                  style={styles.flatListPic}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.flatListContent}>
                  <View style={styles.flatListNameType}>
                    <Text style={styles.flatListText}>{item.name}</Text>
                  </View>

                  <Text style={styles.flatListText}>{item.rating}</Text>
                  <Text style={styles.flatListText} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />

      {/* <FlatListContents
        style={{ borderWidth: 15 }}
        dataFlat={favRestaurant}
        navigation={navigation}
        setLimit={setLimit}
        limit={limit}
        handleColors={handleColors}
      /> */}
    </View>
  );
}
export default YummiestsScreen;
const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: windowHeight * 0.15,
  },
  //<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  flatList: {
    marginTop: windowHeight * 0.014,
    height: windowHeight * 0.125,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListPic: {
    height: windowHeight * 0.125,
    width: windowWidth * 0.28,
  },
  flatListContent: {
    flex: 1,
    justifyContent: "space-between",

    paddingLeft: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
  },
  flatListNameType: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListText: {
    color: "lightgray",
    // textAlign: "left",
  },
});
{
  /* <TouchableOpacity
                style={styles.flatList}
                onPress={() =>
                  navigation.navigate("Restaurant", {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    rating: item.rating,
                    thumbnail: item.thumbnail,
                    // color: handleColors(item.type),
                  })
                }
              >
                <Image
                  style={styles.flatListPic}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.flatListContent}>
                  <View style={styles.flatListNameType}>
                    <Text style={styles.flatListText}>{item.name}</Text>
                  </View>

                  <Text style={styles.flatListText}>{item.rating}</Text>
                  <Text style={styles.flatListText} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity> */
}
{
  /* <FlatList
        style={{ borderWidth: 2, borderColor: "blue" }}
        data={favRestaurant}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                style={styles.flatList}
                onPress={() =>
                  navigation.navigate("Restaurant", {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    rating: item.rating,
                    thumbnail: item.thumbnail,
                    // color: handleColors(item.type),
                  })
                }
              >
                <Image
                  style={styles.flatListPic}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.flatListContent}>
                  <View style={styles.flatListNameType}>
                    <Text style={styles.flatListText}>{item.name}</Text>
                  </View>

                  <Text style={styles.flatListText}>{item.rating}</Text>
                  <Text style={styles.flatListText} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      /> */
}
