import React, { useState, useEffect } from "react";

import { Button, Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
}) {
  // console.log("NAV", navigation.navigate);
  // console.log("couleur", route.params.color);

  const restaurant = route.params;
  // const { borderColor } = route.params.color;
  const resColor = route.params.color;
  const [favRestaurants, setFavRestaurants] = useState([]);
  const [isLoadingFav, setIsLoadingFav] = useState(true);
  // const [data, setData] = useState([]);
  // // console.log(restaurant);
  // useEffect(() => {
  //   save(restaurant);
  // }, [data]);
  // const handleSubmit = (restaurant) => {
  //   e.preventDefault();
  //   setData(restaurant);
  // };
  // setIsLoading(true);
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
          // setIsLoadingFav(false);
          setIsLoading(false);
          // return restaurants.push(storedRes);
          // alert("succes loading");
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
    console.log("claear");
  };
  const save = async (restaurant) => {
    try {
      // if (favRestaurants.length === 0) {
      //   favRestaurants.push(restaurant);
      // }
      // if (favRestaurants.length !== 0) {
      console.log(
        "----------BEFORE--------favRestaurants------SAVE------------"
      );
      console.table(favRestaurants);

      let newTab = [...favRestaurants];
      console.log("-------------------newTab---SAVE----------------");
      console.table(newTab);
      // console.log(restaurant.id);

      // const NewTabFilter = (tab) => {
      //   return tab.filter((elem) => elem.id.includes(restaurant.id));
      // };
      let alreadyInAsybcStorage = false;
      newTab.forEach((e) => {
        if (e.id === restaurant.id) {
          alreadyInAsybcStorage = true;
        }
      });

      console.log(alreadyInAsybcStorage, "AL");

      if (alreadyInAsybcStorage) {
        alert("nope already Fave");
      } else {
        newTab.push(restaurant);
        console.log("-------------------newTab---Save----------------");
        console.table(newTab);
        // let newTab=[...favRestaurants]

        // setFavRestaurants(newTab);
        favRestaurants.push(restaurant);

        console.log(
          "----------AFTER--------favRestaurants------SAVE------------"
        );
        console.table(favRestaurants);

        const stringFav = JSON.stringify(favRestaurants);
        console.log("------------------stringFav------------------");
        console.table(stringFav);
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

          // setFavRestaurants([]);

          console.log("-------------------newTab---IN----------------");
          console.table(newTab);
          console.log(
            "----------BEFORE--------favRestaurants------RMV------------"
          );
          console.table(favRestaurants);
        }
      }
      // newTab.forEach((e) => {
      //   if (e.id === restaurant.id) {
      //     alreadyInAsybcStorage = true;
      //     index = newTab.indexOf(e.id);
      //     console.log(index);
      //   }
      // });

      if (!alreadyInAsybcStorage) {
        alert("NOT in Fave");
      } else {
        //   newTab.splice(collectIndex, 1);
        console.log("-------------------newTab---AFTER SPL----------------");
        console.table(newTab);
        // await AsyncStorage.removeItem("favorites");
        // setFavRestaurants(newTab);
        console.log(
          "----------AFTER--------favRestaurants------RMV------------"
        );
        console.table(favRestaurants);
        const stringFav = JSON.stringify(favRestaurants);
        console.log("------------------stringFav------------------");
        console.table(stringFav);
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
