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

import CompatibleButtonList from "../components/CompatibleButtonList";
import FlatListContents from "../components/FlatlistContents";

import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// import { useNavigation } from "@react-navigation/core";

import { isPointWithinRadius } from "geolib";

import { handleColors } from "../components/lib";

import {
  Text,
  View,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";

import { SearchBar } from "react-native-elements";

import colors from "../assets/colors";
const { drawerGrey, greenFltr, purpleFltr, redFltr } = colors;

function HomeScreen({
  navigation,
  route,
  isLoading,
  setIsLoading,
  setLimit,
  limit,
  skip,
  setSkip,
}) {
  const [data, setData] = useState([]);
  const [flatList, setFlatList] = useState([]);
  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState("");
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [radius, setRadius] = useState(1500);
  const [render, setRender] = useState();
  // const route = useRoute();

  useEffect(() => {
    const abortFetch = new AbortController();
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
            { signal: abortFetch.signal }
          );
        } else {
          // one request w/ all the restaurants
          response = await axios.get(
            `https://oliv-my-happy-cow.herokuapp.com/restaurants?name=${search}&type=${toggleFilter}&limit=${limit}&skip=${skip}`,
            { signal: abortFetch.signal }
          );
        }
        console.log("FectchCAncel got cancel");
        setData(response.data);
        setIsLoading(false);

        // console.log(response.data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fecth Cancel caught");
        } else {
          throw error;
        }
      }
    };
    fetchData();

    return () => {
      abortFetch.abort();
      console.log("cleanup-unmount");
      // source.cancel();
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
            <CompatibleButtonList
              toggleFilter={toggleFilter}
              setToggleFilter={setToggleFilter}
              styleButton={styles.buttonsFlatList}
              styleText={styles.buttonsText}
              styleIsActive={styles.active}
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
          let type = item.type;
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
          enabledInnerScrolling={true}
          snapPoints={["50%", "20%", "75%"]}
          renderContent={renderContent}
        />
      ) : (
        <BottomSheet
          enabledInnerScrolling={true}
          snapPoints={["55%", "20%", "80%"]}
          renderContent={renderContent}
        />
      )}
    </>
  );
}
export default React.memo(HomeScreen);

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
    position: "absolute",
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  container: {
    justifyContent: "center",
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
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth * 1.05,
  },

  buttonsFlatList: {
    height: windowHeight * 0.037,
    width: windowWidth * 0.15,
    backgroundColor: drawerGrey,
    borderColor: "white",
    borderWidth: 1.1,
    borderRadius: 20,
    justifyContent: "center",
    shadowColor: "white",
  },
  buttonsText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  active: {
    color: "white",
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
  },
  calloutPic: { height: 60, width: 60, borderRadius: 20 },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    height: windowHeight * 0.115,
  },
  buttonLeftView: {
    justifyContent: "space-evenly",
  },
  loadMore: {
    marginLeft: windowWidth * 0.007,
    justifyContent: "center",
    height: windowHeight * 0.04,
    backgroundColor: drawerGrey,
    borderRadius: 5,
  },
  loadLess: {
    marginLeft: windowWidth * 0.007,
    justifyContent: "center",
    height: windowHeight * 0.04,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonRightView: {
    justifyContent: "space-between",
  },
  plusButton: {
    marginRight: windowWidth * 0.03,
    justifyContent: "center",
    alignSelf: "center",
    height: windowHeight * 0.075,
    width: windowWidth * 0.08,
    backgroundColor: purpleFltr,
    borderRadius: 100,
  },
  minusButton: {
    marginRight: windowWidth * 0.03,
    justifyContent: "center",
    alignSelf: "center",
    height: windowHeight * 0.075,
    width: windowWidth * 0.08,
    backgroundColor: drawerGrey,
    borderRadius: 100,
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
