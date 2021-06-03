import React, { useState } from "react";

import { Button, Text, View } from "react-native";

export default function RestaurantScreen({ navigation, route }) {
  console.log("couleur", route.params.color);
  // console.log("navivation ==>", navi);
  return (
    // <View>
    <View
      style={{
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        heigth: 300,
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
    </View>
  );
}
