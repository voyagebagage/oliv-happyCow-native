import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

// import * as React from "react";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
// import { TouchableOpacity } from "react-native-gesture-handler";

// Package react-native-maps pour afficher une Map
import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";

import splasHappy from "../assets/splasHappy.png";
import HappyCowLogoText from "../assets/HappyCowLogoText.png";

import { SimpleLineIcons } from "@expo/vector-icons";

// import { Rating, AirbnbRating } from "react-native-ratings";

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
  ScrollView,
} from "react-native";
import { SearchBar } from "react-native-elements";

import colors from "../assets/colors";
const { drawerGrey, greenFltr, purpleFltr, redFltr } = colors;

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState("");
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  let type = "";
  // const [type, setType] = useState("vegan" || "vegetarian" || "veg-options");
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
  const handleColors = (type) => {
    // console.log(type);
    let color = "";
    if (type === "veg-options") {
      return (color = "tomato");
    } else if (type === "vegan") {
      return (color = "green");
    } else if ((type = "vegetarian")) {
      return (color = "purple");
    } else {
      color = "indigo";
    }
    //   } else if (type === "Veg Store") {
    //     return (color = "navy");
    //   } else if ((type = "Ice Cream")) {
    //     return (color = "yellow");
    //   } else if (type === "Other") {
    //     return (color = "linen");
    //   } else if ((type = "Health Store")) {
    //     return (color = "white");
    //   } else if (type === "Organization") {
    //     return (color = "tan");
    //   } else if ((type = "Professional")) {
    //     return (color = "turquoise");
    //   } else if (type === "Bakery") {
    //     return (color = "wheat");
    //   }
  };
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

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  const renderContent = () => (
    <View
      style={{
        backgroundColor: drawerGrey,
        padding: 16,
        height: Platform.OS === "ios" ? windowHeight * 0.75 : windowHeight * 10,
        // borderBottomColor: "transparent",
      }}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <TouchableOpacity
            style={styles.buttonFlatList}
            onPress={() => {
              setToggleFilter("vegan");
            }}
          >
            <Text style={styles.buttonColorGreen}>Vegan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFlatList}
            onPress={() => {
              setToggleFilter("vegetarian");
            }}
          >
            <Text style={styles.buttonColorPurple}>Vegetarian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonFlatList}
            onPress={() => {
              setToggleFilter("veg-option");
            }}
          >
            <Text style={styles.buttonColorRed}>Veg-Options</Text>
          </TouchableOpacity>
        </ScrollView>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.placeId)}
          // ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => {
            return (
              <>
                {/* {item.category === 14 && ( */}
                <TouchableOpacity
                  style={styles.flatList}
                  onPress={() =>
                    navigation.navigate("Restaurant", {
                      id: item.placeId,
                      name: item.name,
                      description: item.description,
                      rating: item.rating,
                      pictures: item.pictures,
                      // color: pinColor,
                    })
                  }
                >
                  <Image
                    style={styles.flatListPic}
                    source={{ uri: item.thumbnail }}
                  />
                  <View style={styles.flatListContent}>
                    <View style={styles.flatListNameType}>
                      <Text style={styles.flatListText}>{item.name}</Text>
                      <Text style={styles.flatListText}>{item.type}</Text>
                    </View>

                    <Text style={styles.flatListText}>{item.rating}</Text>

                    <Text style={styles.flatListText} numberOfLines={2}>
                      {item.description}
                    </Text>
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
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        // To show user's location :
        showsUserLocation={true}
      >
        {/* {console.log(data)} */}
        {data.map((item) => {
          // console.log(item.location.lat);
          type = item.type;
          // console.log(type);

          return (
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
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // margin: 10,
  },
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST HEADER, buttons etc|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  scrollView: {
    height: 40,
    // flexDirection: "row",
  },
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
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
  // buttonText: {
  //   alignSelf: "center",
  //   color: "white",
  //   fontWeight: "bold",
  // },
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
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  flatList: {
    marginTop: windowHeight * 0.014,
    height: windowHeight * 0.125,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListPic: {
    height: windowHeight * 0.125,
    width: windowWidth * 0.28,
  },
  flatListContent: {
    flex: 1,
    justifyContent: "space-between",

    paddingLeft: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
  },
  flatListNameType: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatListText: {
    color: "lightgray",
    // textAlign: "left",
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

    // height: 80,
  },
  calloutPic: { height: 60, width: 60 },

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

// item.type === "vegan"
//     ? "green"
//     : item.type === "vegetarian"
//     ? "purple"
//     : item.type === "veg-options"
//     ? "tomato"
//     : "indigo"
// style={styles.markers}
// - '#f0f' (#rgb)
// - '#f0fc' (#rgba)
// - '#ff00ff' (#rrggbb)
// - '#ff00ff00' (#rrggbbaa)
// - 'rgb(255, 255, 255)'
// - 'rgba(255, 255, 255, 1.0)'
// - 'hsl(360, 100%, 100%)'
// - 'hsla(360, 100%, 100%, 1.0)'
// - 'transparent'
// - 'red'
// - 0xff00ff00 (0xrrggbbaa)
