import axios from "axios";
import React, { useState, useEffect } from "react";

import splasHappy from "../assets/splasHappy.png";

import { Dimensions } from "react-native";

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
} from "react-native";

export default function HomeScreen({ navigation }) {
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
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.placeId)}
      renderItem={({ item }) => {
        console.log(item.placeId);
        console.log(item.name);
        return (
          <>
            {console.log(item)}

            <TouchableOpacity
              style={styles.flatList}
              onPress={() => {
                navigation.navigate("Restaurant", {
                  id: item.placeId,
                  // console.log();
                });
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          </>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  splash: {
    flex: 1,
  },
  flatList: {
    height: 50,
    // width: 100,
  },
});
