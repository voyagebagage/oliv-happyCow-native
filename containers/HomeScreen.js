import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

// import * as React from "react";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

// Package react-native-maps pour afficher une Map
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import splasHappy from "../assets/splasHappy.png";
import HappyCowLogoText from "../assets/HappyCowLogoText.png";

import { SimpleLineIcons } from "@expo/vector-icons";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
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
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";

import colors from "../assets/colors";
const { drawerGrey } = colors;

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState("");
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        let response;
        if (status === "granted") {
          // 1 - collect GPS coordinates of the user's device
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          // console.log(Location);
          setLat(location.coords.latitude);
          setLong(location.coords.longitude);

          // 2 - make requests related to his location
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}&type=${toggleFilter}&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&limit=${limit}&skip=${skip}`
          );
        } else {
          // one request w/ all the restaurants
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}&type=${toggleFilter}&limit=${limit}&skip=${skip}`
          );
        }
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [search, toggleFilter, limit, skip]);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\

  // SEARCH
  const handleSearchResto = (text) => {
    if (text) {
      // text.preventDefault();
      setSearch(text);
      // console.log(text);
    } else {
      return false;
    }
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\

  // const renderHeader = () => ();
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  const renderContent = () => (
    <View
      style={{
        backgroundColor: drawerGrey,
        padding: 16,
        height: windowHeight * 2,
        // borderBottomColor: "transparent",
      }}
    >
      <View style={styles.container}>
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
                  <View>
                    <Text style={styles.flatListText}>{item.name}</Text>
                    <Text style={styles.flatListText}>{item.type}</Text>
                    <Text style={styles.flatListText}>{item.category}</Text>
                    <Text style={styles.flatListText}>{item.vegan}</Text>
                    <Text style={styles.flatListText}>{item.vegOnly}</Text>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );

  const sheetRef = React.useRef(null);
  //////////////////////////^^^^^^^^^^^^^^^^^^^^^^\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  return isLoading ? (
    <>
      <ImageBackground style={styles.splash} source={splasHappy}>
        <ActivityIndicator
          size="large"
          color="purple"
          style={styles.activityIndicator}
        />
      </ImageBackground>
    </>
  ) : (
    <>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        // To center on an specific area :

        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        // To show user's location :
        showsUserLocation={true}
      >
        {/* {console.log(data)} */}
        {data.map((item) => {
          // console.log(item.location.lat);

          return (
            <MapView.Marker
              key={item.placeId}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}
              // style={styles.markers}
            />
          );
        })}
      </MapView>
      <Image style={styles.logo} source={HappyCowLogoText} />
      <View style={styles.searchBarView}>
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
          value={search}
        />
      </View>

      {Platform.OS === "ios" ? (
        <BottomSheet
          // ref={sheetRef}
          // enabledBottomInitialAnimation={true}
          snapPoints={["75%", "50%", "20%"]}
          renderContent={renderContent}
        />
      ) : (
        <BottomSheet
          // ref={sheetRef}
          snapPoints={["80%", "55%", "20%"]}
          // enabledBottomInitialAnimation={true}
          renderContent={renderContent}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: windowHeight * 0.15,
  },
  drawerGrey: {
    backgroundColor: drawerGrey,
  },
  splash: {
    flex: 1,
  },
  logo: {
    height: "20%",
    width: "45%",
    marginTop:
      Platform.OS === "android"
        ? -windowHeight * 0.032
        : Platform.OS === "ios"
        ? -windowHeight * 0.028
        : 0,

    // minHeight: windowHeight * 0.2,
    // backgroundColor: "red",
    position: "absolute",
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "flex-start",
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
  flatListText: {
    color: "lightgray",
  },
  map: {
    flex: 1,
  },
  markers: {
    height: 20,
    width: 20,
    backgroundColor: "red",
  },
  searchBarView: {
    marginTop: windowHeight * 0.088,
    backgroundColor: "transparent",
    position: "absolute",
  },
  containerStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    // minWidth: 100,
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingBottom: 10,
    paddingVertical: windowHeight * 0.008,
    justifyContent: "center",
  },

  inputContainerStyle: {
    backgroundColor: "black",
    height: windowHeight * 0.038,
    borderWidth: 1,
    borderColor: "white",
    // boxSizing: "border-box",
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0,
    paddingHorizontal: windowWidth * 0.01,
    marginHorizontal: windowWidth * 0.015,
    fontSize: 17,
    color: "white",
    // height: windowHeight * 0.02,
    borderRadius: 5,
    // borderColor: "transparent",
    backgroundColor: "black",
  },
  leftIconContainerStyle: {
    marginRight: -10,
  },
});
