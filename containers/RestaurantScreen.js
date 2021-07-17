import React, { useState, useEffect } from "react";

import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type, color, handleColors } from "../components/lib";
// import { useRoute } from "@react-navigation/native";
// const route = useRoute();
// let type = route.params.type;
// const resColor = handleColors(type);
function RestaurantScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  favRestaurants,
  setFavRestaurants,
}) {
  const restaurant = route.params;
  const resColor = handleColors(route.params.type);
  // const type = route.params.type;
  // export let colorExp = route.params.color;

  const [isLoadingFav, setIsLoadingFav] = useState(true);

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
        // let newTab=[...favRestaurants]
        // setFavRestaurants(newTab);
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
          // newTab.splice(index, 1);
          favRestaurants.splice(index, 1);
          // setFavRestaurants([]);
        }
      }
      if (!alreadyInAsybcStorage) {
        alert("NOT in Fave");
      } else {
        // newTab.splice(collectIndex, 1);
        // setFavRestaurants(newTab);
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
    // backgroundColor: resColor,
  },
});
