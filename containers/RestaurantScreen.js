import React, { useState } from "react";

import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantScreen({ navigation, route }) {
  // console.log("couleur", route.params.color);
  // console.log(route.params);

  const save = async () => {
    try {
      await AsyncStorage.setItem("oneRestaurant", JSON.stringify(route.params));
    } catch (error) {
      console.log("you got a saving issue!");
    }
  };
  const removeRes = async () => {
    try {
      await AsyncStorage.removeItem("oneRestaurant");
    } catch (error) {
      console.log("remove failed");
    }
  };
  return (
    // <View>
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
        borderColor: route.params.color,
        backgroundColor: route.params.color,
      }}
    >
      <Text>Hello resto</Text>
      <Text>{route.params.id}</Text>
      <Text>{route.params.name}</Text>
      <Text>{route.params.type}</Text>

      <Text>{route.params.rating}</Text>

      <Text>{route.params.description}</Text>
      <Button
        // style={{ marginTop: 700 }}
        title={"add Yummies"}
        onPress={() => save()}
      />
      <Button
        // style={{ alignSelf: "flex-end" }}
        title={"remove Yummies"}
        onPress={() => removeRes()}
      />
    </View>
  );
}
