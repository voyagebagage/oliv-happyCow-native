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
import { SearchBar } from "react-native-elements";

export default function HomeScreen({ navigation, route }) {
  // const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  // const [searchResto, setSearchResto] = useState("");
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (handleSearchResto === false) {
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants`
          );

          setData(response.data);

          setIsLoading(false);
          // console.log(handleSearchResto);
        } else {
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}`
          );
          console.log(
            "-------------------------------0000---------------000---XXXXxxxxxxxx"
          );
          console.log("NAME---" + response.data[1].name);
          console.log("LENGHT---" + response.data.length);
          console.log(
            "-------------------------------0000---------------000---XXXXxxxxxxxx"
          );
          for (let i = 0; i < response.data.length; i++) {
            const newElem = [];
            const element = response.data[i].name;
            console.log("apres search" + element);
            element.indexOf(search);
            console.log("apres indexof" + element);

            if (element.indexOf(search) !== -1) {
              newElem.push(element);
            }
            console.log("apres search" + newElem);
          }
          // setData(newElem);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [search]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  // RECHERCHE

  const handleSearchResto = (text) => {
    if (text) {
      // text.preventDefault();
      setSearch(text);
      console.log(text);
    } else {
      return false;
    }
  };

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  //////////////////////////^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return isLoading ? (
    <>
      <ImageBackground style={styles.splash} source={splasHappy}>
        <ActivityIndicator size="large" color="purple" />
      </ImageBackground>
    </>
  ) : (
    <View style={styles.container}>
      {/* <View style={styles.viewTextInput}> */}
      <SearchBar
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        searchIcon={() => (
          <SimpleLineIcons
            name="compass"
            size={24}
            color="grey"
            style={styles.iconTextInput}
          />
        )}
        placeholder={`à Proximité`}
        onChangeText={handleSearchResto}
        // onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      {/* </View> */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.placeId)}
        // ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({ item }) => {
          // console.log(item.placeId);
          // console.log(item.name);
          return (
            <>
              {/* {item.category === 14 && ( */}
              <TouchableOpacity
                style={styles.flatList}
                onPress={() =>
                  navigation.navigate("Restaurant", { id: item.placeId })
                }
              >
                <Text>{item.name}</Text>
                <Text>{item.type}</Text>
                <Text>{item.category}</Text>
                <Text>{item.vegan}</Text>
                <Text>{item.vegOnly}</Text>
              </TouchableOpacity>
              {/* )} */}
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
    height: windowHeight * 0.15,
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    // width: 100,
  },
  containerStyle: {
    flexDirection: "row",
    // minWidth: 100,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "purple",
    // paddingBottom: 10,
    paddingVertical: windowHeight * 0.008,
    justifyContent: "center",
  },

  inputContainerStyle: {
    backgroundColor: "white",
    height: windowHeight * 0.038,
  },
  inputStyle: {
    flex: 1,
    // width: windowWidth - 50,
    paddingHorizontal: windowWidth * 0.01,
    marginHorizontal: windowWidth * 0.015,
    // borderWidth: 2,
    // marginLeft: -20,
    fontSize: 17,
    color: "black",

    // height: windowHeight * 0.02,
    borderRadius: 5,
    borderColor: "transparent",
    backgroundColor: "white",
  },
  leftIconContainerStyle: {
    marginRight: -10,
  },
});
