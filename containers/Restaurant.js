import React, { useState } from "react";

import { Button, Text, View } from "react-native";

export default function Restaurant({ route }) {
  return (
    <>
      <Text>Hello resto</Text>
      <Text>{route.params.id}</Text>
    </>
  );
}
