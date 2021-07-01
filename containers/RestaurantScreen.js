import React, { useState } from "react";

import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantScreen({ navigation, route }) {
  // console.log("NAV", navigation.navigate);
  // console.log("couleur", route.params.color);
  const restaurant = route.params;
  // console.log(restaurant);

  const save = async (restaurant) => {
    try {
      const jsonValue = JSON.stringify(restaurant);
      const parsedFav = await AsyncStorage.setItem(
        "restaurant",
        JSON.stringify(jsonValue)
      );
      const newTab = [...parsedFav];
      console.log("-------------", newTab, "-----------");
    } catch (error) {
      console.log("-------------you got a saving issue!-----------");
    }
    console.log("Done.");
  };
  const removeRes = async () => {
    try {
      await AsyncStorage.removeItem("restaurant");
    } catch (error) {
      console.log("-----------remove failed-----------");
    }
    console.log("-------------REMOVED-----------");
  };
  return (
    <View
      style={{
        // backgroundColor: purpleFltr,
        color: "white",
        fontWeight: "bold",

        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        // heigth: 300,
        marginTop: 100,
        borderWidth: 10,
        borderColor: restaurant.color,
        backgroundColor: restaurant.color,
      }}
    >
      <Text>Hello resto</Text>
      <Text>{restaurant.id}</Text>
      <Text>{restaurant.name}</Text>
      <Text>{restaurant.type}</Text>
      <Text>{restaurant.rating}</Text>
      <Text>{restaurant.description}</Text>
      <Button title={"add Yummies"} onPress={() => save(restaurant)} />
      <Button title={"remove Yummies"} onPress={() => removeRes()} />
    </View>
  );
}
// Pour stocker un favori (qu'on appellera newFav) :

// try {
//  let favorites = await AsyncStorage.getItem("favorites"); // recupérer le tableau de favoris stringifié
//  let parsedFav = JSON.parse(favorites) // le retransformer en tableau
//  let newTab = [...parsedFav]; // le copier
//  let isAlreadyFavorite = false;
//  for (let i=0; i < newTab.length ; i++) {
//    if (newTab[i].id === newFav.id) {
//       isAlreadyFavorite = true
//       }
//    }
//    if (!isAlreadyFavorite) {
//      newTab.push(newFav);
//     }
//    let stringifiedFavs = JSON.stringify(newTab);
//    await AsyncStorage.setItem("favorites", stringifiedFavs);
//  } catch (error) {
//   console.log("you got a saving issue!");
// }
// @Atha00

// Atha00 commented 4 hours ago
// Pour le retirer, c'est le même principe sauf que dans la boucle on fera :

// for (let i=0; i < newTab.length ; i++) {
//    if (newTab[i].id === newFav.id) {
//       newTab.splice(i, 1)
//       }
//    }
