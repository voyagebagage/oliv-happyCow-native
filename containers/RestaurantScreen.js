import React, { useState, useEffect } from "react";

import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type, color, handleColors } from "../components/lib";

function RestaurantScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  favRestaurants,
  setFavRestaurants,
}) {
  const restaurant = route.params;

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
  return !isLoading ? (
    <View style={styles.mainView}>
      <Text>Hello resto</Text>
      <Text>{restaurant.id}</Text>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.type}</Text>
      <Text>{restaurant.rating}</Text>
      <Text>{restaurant.description}</Text>
      <Button title={"add Yummies"} onPress={() => save(restaurant)} />
      <Button title={"remove Yummies"} onPress={() => removeRes()} />
      <Button title={"CLEAR"} onPress={() => clearAsyncStorage()} />
    </View>
  ) : null;
}
export default React.memo(RestaurantScreen);
const styles = StyleSheet.create({
  mainView: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    borderWidth: 10,
  },
});
