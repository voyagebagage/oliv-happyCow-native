import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import colors from "../assets/colors";
const { drawerGrey, lightGrey } = colors;
export default function YummiestsScreen() {
  const [favRestaurant, setFavRestaurant] = useState();

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem("oneRestaurant");
        const storedRes = JSON.parse(stored);
        console.log("fav--------------------", storedRes);
        if (storedRes !== null) {
          // let resCopy = [];
          // const resCopy = [...storedRes];
          // resCopy.push(storedRes);
          // console.log("RESSS--------------------", resCopy);

          setFavRestaurant(storedRes);
          console.log("fav--------------------", favRestaurant);
        }
        // console.log(favRestaurant);
      } catch (error) {
        console.log("Failed to load !");
      }
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

  // console.log(favRestaurant);
  // console.log(storedRes);
  return (
    <View style={{ backgroundColor: drawerGrey, flex: 1 }}>
      <Text>No Yummiests Yet ! </Text>
      {/* <Text>{favRestaurant.name}</Text> */}
      {/* {favRestaurant.map((item) => {
        console.log(item);
        return <Text>{item.name}</Text>;
      })} */}
    </View>
  );
}
