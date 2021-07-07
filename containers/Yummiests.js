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

export default function YummiestsScreen({
  navigation,
  setLimit,
  limit,
  isLoading,
  setIsLoading,
  type,
  color,
  handleColors,
}) {
  const [favRestaurants, setFavRestaurants] = useState([]);
  const [isLoadingFav, setIsLoadingFav] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem("favorites");
        const storedRes = JSON.parse(stored);
        if (storedRes !== null) {
          console.log("-------------------storedRes-------------------");
          console.table(storedRes);

          let newTab = [...storedRes];
          console.log("-------------------newTab---LOAD----------------");
          console.table(newTab);
          setFavRestaurants(newTab);

          // favRestaurants.push(newTab);
          console.log(
            "-------------------favRestaurants---LOAD----------------"
          );

          console.table(favRestaurants);
          setIsLoadingFav(false);
          // setIsLoading(false);
          // return restaurants.push(storedRes);
          alert("succes loading");
        }
        console.log("--------------REsss-------------", favRestaurants);
      } catch (error) {
        console.log("Failed to load !");
      }
      console.log("Done.");
    };
    load();
  }, []);

  const removeYum = async () => {
    try {
      await AsyncStorage.removeItem("oneRestaurant");
    } catch (error) {
      console.log("remove failed");
    }
  };
  return !isLoading ? (
    <View style={{ backgroundColor: drawerGrey, flex: 1 }}>
      <Text style={{ color: "white", height: 24 }}>
        {favRestaurants.length}
      </Text>
      <FlatList
        style={{ borderWidth: 2, borderColor: "blue" }}
        data={favRestaurants}
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
  ) : null;
}
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
