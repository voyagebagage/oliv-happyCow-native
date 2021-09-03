import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
function PhotoScreen({ navigation, route }) {
  const arrPics = route.params;
  console.log(arrPics);
  return <Text>coucou</Text>;
}

export default PhotoScreen;
