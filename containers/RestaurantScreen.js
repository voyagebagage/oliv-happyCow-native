import React, { useState, useEffect } from "react";

import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantScreen({ navigation, route }) {
  // console.log("NAV", navigation.navigate);
  // console.log("couleur", route.params.color);
  const restaurant = route.params;
  // const [data, setData] = useState([]);
  // // console.log(restaurant);
  // useEffect(() => {
  //   save(restaurant);
  // }, [data]);
  // const handleSubmit = (restaurant) => {
  //   e.preventDefault();
  //   setData(restaurant);
  // };

  const save = async (restaurant) => {
    try {
      // console.log("-----1-----stringifiedFavs---", newTab, "------1------");
      const stringFav = JSON.stringify(restaurant);
      console.log("-----1-----STRFAV---", stringFav, "------1------");

      await AsyncStorage.setItem("favorites", stringFav);
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
// let favorites = await AsyncStorage.getItem("favorites");
// // console.log("-----000--FAV------", favorites, "------00------");
// console.log("-----015------");

// let parsedFav = JSON.parse(favorites);
// console.log("-----1------");
// // if (parsedFav !== null) {
// // console.log("-----000--parseFav------", parsedFav, "------00------");
// let newTab = [...parsedFav];
// console.log("-----2------");

// // console.log("-----1--------", [newTab], "------1------");
// // if (newTab !== null) {
// let isAlreadyFavorite = false;
// for (let i = 0; i < newTab.length; i++) {
//   console.log("-----x------");
//   if (newTab[i].id === restaurant.id) {
//     console.log("-----y------");
//     isAlreadyFavorite = true;
//   }
// }
// if (!isAlreadyFavorite) {
//   console.log("-----3------");
//   // console.log("-----1-----alre---", isAlreadyFavorite, "------1------");
//   newTab.push(restaurant);
//   await AsyncStorage.setItem("favorites", JSON.stringify(newTab));
// } else {
//   console.log("-----4------");
//   await AsyncStorage.setItem("favorites", JSON.stringify(restaurant));
// }
// // }
// // console.log("-----1-----stringifiedFavs---", stringFav, "------1------");
// console.log("-----5------");

// // }
