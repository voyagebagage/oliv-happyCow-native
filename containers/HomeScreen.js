import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";

// import * as React from "react";
// import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

// Package react-native-maps pour afficher une Map
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";

import splasHappy from "../assets/splasHappy.png";
import HappyCowLogoText from "../assets/HappyCowLogoText.png";

import { SimpleLineIcons } from "@expo/vector-icons";

import CompatibleButton from "../components/CompatibleButton";
import FlatListContents from "../components/FlatlistContents";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// import { useNavigation } from "@react-navigation/core";

import { isPointWithinRadius } from "geolib";

import {
  Button,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
// import {  } from "react-native";
// import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
// import isPointWithinRadius from "geolib/es/isPointWithinRadius";

// import RestaurantScreen from "./RestaurantScreen";
import colors from "../assets/colors";
const { drawerGrey, greenFltr, purpleFltr, redFltr } = colors;

export default function HomeScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  setLimit,
  limit,
  skip,
  setSkip,
  type,
  color,
  handleColors,
}) {
  const [data, setData] = useState([]);
  const [flatList, setFlatList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState("");
  // const [limit, setLimit] = useState(25);
  // const [skip, setSkip] = useState(0);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [radius, setRadius] = useState(1500);
  const [render, setRender] = useState();
  // const [counter, setCounter] = useState(0);
  const callbackD = useCallback(() => setData([]), [setData]);

  useEffect(() => {
    // const abortFetch = new AbortController();
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        console.log("fetching");
        const { status } = await Location.requestForegroundPermissionsAsync();
        let response;
        if (status === "granted") {
          // 1 - collect GPS coordinates of the user's device
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setLat(location.coords.latitude);
          setLong(location.coords.longitude);

          // 2 - make requests related to his location
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}&type=${toggleFilter}&latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&limit=${limit}&skip=${skip}`,
            { cancelToken: source.token }
            // { signal: abortFetch.signal }
          );
        } else {
          // one request w/ all the restaurants
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}&type=${toggleFilter}&limit=${limit}&skip=${skip}`,
            { cancelToken: source.token }
          );
        }
        setData(response.data);
        setIsLoading(false);

        // console.log(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel");
        } else {
          setIsLoading(false);
          console.log(error);
        }
        // if (error.name === "AbortError") {
        //   console.log("Fecth Cancel caught");
        // } else {
        //   throw error;
        // }
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);

    return () => {
      // abortFetch.abort();
      source.cancel();
      console.log("cleanup");
    };
  }, [search, toggleFilter, limit, skip, radius]);

  // SEARCH
  const handleSearchResto = (text) => {
    if (text) {
      setSearch(text);
    } else {
      return false;
    }
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  const renderContent = () =>
    !isLoading ? (
      <View style={styles.firstParentViewRenderContent}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <CompatibleButton
              type={""}
              buttonName={"ALL"}
              setToggleFilter={setToggleFilter}
              styleButton={styles.buttonFlatListAll}
              styleText={styles.buttonAll}
            />
            <CompatibleButton
              type={"vegan"}
              buttonName={"Vegan"}
              setToggleFilter={setToggleFilter}
              styleButton={styles.buttonFlatList}
              styleText={styles.buttonColorGreen}
            />
            <CompatibleButton
              type={"vegetarian"}
              buttonName={"Vegetarian"}
              setToggleFilter={setToggleFilter}
              styleButton={styles.buttonFlatList}
              styleText={styles.buttonColorPurple}
            />
            <CompatibleButton
              type={"veg-options"}
              buttonName={"Veg-option"}
              setToggleFilter={setToggleFilter}
              styleButton={styles.buttonFlatList}
              styleText={styles.buttonColorRed}
            />
          </ScrollView>

          <FlatListContents
            data={data}
            navigation={navigation}
            setLimit={setLimit}
            limit={limit}
            skip={skip}
            setSkip={setSkip}
            handleColors={handleColors}
          />
        </View>
      </View>
    ) : null;

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
        showsUserLocation={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        showsScale={true}
        // To center on an specific area :
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        //only IOS
        mapPadding={{ top: 0, left: 0, right: 0, bottom: windowHeight * 0.45 }}
        // To show user's location :
      >
        {data.map((item) => {
          type = item.type;
          const closest = isPointWithinRadius(
            { latitude: lat, longitude: long },
            {
              latitude: item.location.lat,
              longitude: item.location.lng,
            },

            radius
          );
          // console.log(closest);
          return closest ? (
            <MapView.Marker
              key={item.placeId}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}
              pinColor={handleColors(type)}
            >
              <Callout>
                <TouchableOpacity style={styles.calloutButton}>
                  <Text>{item.name}</Text>
                  <Image
                    style={styles.calloutPic}
                    source={{ uri: item.thumbnail }}
                  />
                </TouchableOpacity>
              </Callout>
            </MapView.Marker>
          ) : null;
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
        <View style={styles.buttonView}>
          <View style={styles.buttonLeftView}>
            <TouchableOpacity
              onPress={() => setLimit(limit + 50)}
              style={styles.loadMore}
            >
              <Text style={{ color: "white" }}> Load More </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLimit(limit - 50)}
              style={styles.loadLess}
            >
              <Text> Load Less </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRightView}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => setRadius(radius + 1000)}
            >
              <Text> +</Text>
            </TouchableOpacity>
            <Text
              style={{ color: purpleFltr, fontWeight: "bold", fontSize: 20 }}
            >
              {radius / 1000}km
            </Text>
            <TouchableOpacity
              style={styles.minusButton}
              onPress={() => setRadius(radius - 1000)}
            >
              <Text style={{ color: "white" }}> -</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {Platform.OS === "ios" ? (
        <BottomSheet
          // ref={sheetRef}
          enabledInnerScrolling={true}
          // enabledBottomInitialAnimation={true}
          snapPoints={["50%", "20%", "75%"]}
          renderContent={renderContent}
        />
      ) : (
        <BottomSheet
          // ref={sheetRef}
          enabledInnerScrolling={true}
          snapPoints={["55%", "20%", "80%"]}
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
  greenFltr: {
    backgroundColor: greenFltr,
  },
  purpleFltr: {
    backgroundColor: purpleFltr,
  },
  redFltr: {
    backgroundColor: redFltr,
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
    // flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // margin: 10,
  },
  //---------------------//////----------------------------------
  firstParentViewRenderContent: {
    backgroundColor: drawerGrey,
    padding: 16,
    height:
      Platform.OS === "ios"
        ? windowHeight * 0.75
        : windowHeight * 0.125 * limit + windowHeight * 0.04,
  },
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST HEADER, buttons etc|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  scrollView: {
    height: windowHeight * 0.04,
    // flexDirection: "row",
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // flex: 1,
    width: windowWidth * 1.05,
    // borderColor: "crimson",
    // borderWidth: 1,
  },
  buttonFlatList: {
    height: windowHeight * 0.037,
    width: windowWidth * 0.29,
    backgroundColor: drawerGrey,
    borderColor: "white",
    borderWidth: 1.1,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "white",
  },
  buttonFlatListAll: {
    height: windowHeight * 0.037,
    width: windowWidth * 0.15,
    backgroundColor: drawerGrey,
    borderColor: "white",
    borderWidth: 1.1,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "white",
  },
  buttonAll: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    // width: windowWidth * 0.15,
  },
  buttonColorGreen: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    color: greenFltr,
    // borderWidth: 1,
  },
  buttonColorPurple: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    color: purpleFltr,
  },
  buttonColorRed: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    color: redFltr,
  },

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----|M.A.P.|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  map: {
    flex: 1,
  },
  markers: {
    height: 20,
    width: 20,
    backgroundColor: "red",
  },
  calloutButton: {
    flexDirection: "column",
    backgroundColor: "transparent",
    borderRadius: 20,
    // height: 80,
  },
  calloutPic: { height: 60, width: 60, borderRadius: 20 },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    // borderColor: "blue",
    // borderWidth: 4,
    justifyContent: "space-between",
    height: windowHeight * 0.115,
  },
  buttonLeftView: {
    // borderColor: "purple",
    // borderWidth: 4,
    justifyContent: "space-evenly",
  },
  loadMore: {
    marginLeft: windowWidth * 0.007,
    justifyContent: "center",
    height: windowHeight * 0.04,
    // borderWidth: 2,
    backgroundColor: drawerGrey,
    borderRadius: 5,
  },
  loadLess: {
    marginLeft: windowWidth * 0.007,
    justifyContent: "center",
    height: windowHeight * 0.04,
    // borderWidth: 2,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonRightView: {
    // borderColor: "crimson",
    // borderWidth: 4,
    justifyContent: "space-between",
  },
  plusButton: {
    marginRight: windowWidth * 0.03,
    justifyContent: "center",
    alignSelf: "center",
    height: windowHeight * 0.075,
    width: windowWidth * 0.08,
    // borderWidth: 2,
    backgroundColor: purpleFltr,
    borderRadius: 100,

    // color: "white",
  },
  minusButton: {
    marginRight: windowWidth * 0.03,
    justifyContent: "center",
    alignSelf: "center",
    height: windowHeight * 0.075,
    width: windowWidth * 0.08,
    // borderWidth: 2,
    backgroundColor: drawerGrey,
    borderRadius: 100,

    // color: "white",
  },
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----|S_E_A_R_C_H|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  searchBarView: {
    marginTop: windowHeight * 0.088,
    backgroundColor: "transparent",
    position: "absolute",
  },
  containerStyle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    alignItems: "center",
    paddingBottom: 10,
    paddingVertical: windowHeight * 0.008,
    justifyContent: "center",
  },

  inputContainerStyle: {
    backgroundColor: "black",
    height: windowHeight * 0.038,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 5,
  },
  inputStyle: {
    // flex: 1,
    borderBottomColor: "white",
    borderTopColor: "white",
    paddingHorizontal: windowWidth * 0.01,
    marginHorizontal: windowWidth * 0.015,
    fontSize: 17,
    color: "white",
    minHeight: windowHeight * 0.035,
    backgroundColor: "black",
  },
  leftIconContainerStyle: {
    marginRight: -10,
  },
});
