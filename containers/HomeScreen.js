import axios from "axios";
import React, { useState, useEffect } from "react";

import splasHappy from "../assets/splasHappy.png";

import { SimpleLineIcons } from "@expo/vector-icons";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
console.log(windowWidth);
// import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";

export default function HomeScreen({ navigation, route }) {
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://oliv-my-happy-cow.herokuapp.com/restaurants"
        );

        setData(response.data);
        setIsLoading(false);
        // console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <>
      <ImageBackground style={styles.splash} source={splasHappy}>
        <ActivityIndicator size="large" color="purple" />
      </ImageBackground>
    </>
  ) : (
    <View style={styles.container}>
      <View style={styles.viewTextInput}>
        <SimpleLineIcons
          name="compass"
          size={24}
          color="lightgrey"
          style={styles.iconTextInput}
        />
        <TextInput
          style={styles.textInput}
          placeholder={` à Proximité`}
          underlineColorAndroid="transparent"
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.placeId)}
        renderItem={({ item }) => {
          // console.log(item.placeId);
          // console.log(item.name);
          return (
            <>
              {console.log(item)}

              <TouchableOpacity
                style={styles.flatList}
                onPress={() =>
                  navigation.navigate("Restaurant", { id: item.placeId })
                }
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  splash: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // margin: 10,
  },
  flatList: {
    height: 50,
    // width: 100,
  },
  viewTextInput: {
    flexDirection: "row",
    // minWidth: 100,
    borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "purple",
    // paddingBottom: 10,
    minHeight: "7.5%",
    justifyContent: "center",
  },
  iconTextInput: {
    // paddingRight: -100,
    // alignItems: "center",
  },
  textInput: {
    flex: 1,
    // width: windowWidth - 50,
    paddingHorizontal: windowWidth * 0.02,

    marginHorizontal: windowWidth * 0.015,
    // borderWidth: 2,
    height: windowHeight * 0.05,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "white",
  },
});
