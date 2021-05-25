import React, { useState } from "react";

import { Button, Text, View } from "react-native";

export default function RestaurantScreen({ navigation, route }) {
  console.log("route ==>", route);
  return (
    <>
      <Text>Hello resto</Text>
      <Text>{route.params.id}</Text>
    </>
  );
}
