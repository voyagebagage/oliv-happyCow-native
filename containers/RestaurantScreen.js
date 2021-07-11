import React, { useState, useEffect } from "react";

import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RestaurantScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  favRestaurants,
  setFavRestaurants,
}) {
  const restaurant = route.params;
  const resColor = route.params.color;
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
      let collectIndex = 0;
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
