import React, { useState } from "react";

import { Button, Text, View } from "react-native";

export default function RestaurantScreen({ navigation, route }) {
  console.log("route ==>", route);
  console.log("navivation ==>", navigation.navigate);
  return (
    // <View>
    <View
    // style={{
    //   // flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    //   // position: "absolute",
    //   heigth: 300,
    //   marginTop: 100,
    //   borderWidth: 5,
    //   // borderColor: "red",
    //   // backgroundColor: "purple",
    // }}
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
