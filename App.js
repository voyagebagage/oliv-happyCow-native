import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./containers/HomeScreen";
import RestaurantScreen from "./containers/RestaurantScreen";

import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import YummiestsScreen from "./containers/Yummiests";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import splasHappy from "./assets/splasHappy.png";
// import {  } from '@expo/vector-icons';
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import { StyleSheet, Image } from "react-native";
// import Restaurant from "./containers/Restaurant";

import colors from "./assets/colors";
const { drawerGrey, lightGrey, purpleFltr } = colors;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [favRestaurants, setFavRestaurants] = useState([]);

  // const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  let type = "";
  let color = "";
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  const handleColors = (type) => {
    // console.log(type);
    // let color = "";
    if (type === "veg-options") {
      return (color = "tomato");
    } else if (type === "vegan") {
      return (color = "green");
    } else if (type === "vegetarian") {
      return (color = "purple");
    } else if (type === "Veg Store") {
      return (color = "navy");
    } else if (type === "Ice Cream") {
      return (color = "yellow");
    } else if (type === "Other") {
      return (color = "linen");
    } else if (type === "Health Store") {
      return (color = "white");
    } else if (type === "Organization") {
      return (color = "tan");
    } else if (type === "Professional") {
      return (color = "turquoise");
    } else if (type === "Bakery") {
      return (color = "wheat");
    } else {
      return (color = "blue");
    }
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        // null : userToken === null ?
        <Image style={styles.splash} source={splasHappy} />
      ) : (
        // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        // <Stack.Navigator>
        //   <Stack.Screen name="SignIn">
        //     {() => <SignInScreen setToken={setToken} />}
        //   </Stack.Screen>
        //   <Stack.Screen name="SignUp">
        //     {() => <SignUpScreen setToken={setToken} />}
        //   </Stack.Screen>
        // </Stack.Navigator>
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "purple",
                  inactiveTintColor: "gray",
                  // tabStyle: "grey",
                  tabStyle: {
                    borderTopColor: "transparent",
                    borderTopWidth: 0,
                    borderTransparent: true,

                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    backgroundColor: drawerGrey,
                  },
                  style: { borderTopColor: "transparent" },
                }}
                // style
              >
                <Tab.Screen
                  name="Explore"
                  options={{
                    tabBarLabel: "Explore",
                    style: { borderTopColor: drawerGrey },
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="search1" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                      screenOptions={{
                        headerTransparent: true,
                        headerShown: true,
                      }}
                    >
                      {/* peut mettre des options la */}
                      <Stack.Screen
                        name="Home"
                        options={{
                          // headerStyle: {
                          // },
                          // headerTitleStyle: {`
                          // },
                          title: " ",
                        }}
                      >
                        {(props) => (
                          <HomeScreen
                            {...props}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setLimit={setLimit}
                            limit={limit}
                            setSkip={setSkip}
                            skip={skip}
                            type={type}
                            color={color}
                            handleColors={handleColors}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Restaurant"
                        // style={{
                        //   backgroundColor: purpleFltr,
                        //   color: "white",
                        //   fontWeight: "bold",
                        // }}
                        // options={
                        //   {
                        //     // title: "Restaurant",
                        //     // headerTitleStyle: {
                        //     // },
                        //   }
                        // }
                      >
                        {(props) => (
                          <RestaurantScreen
                            {...props}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            favRestaurants={favRestaurants}
                            setFavRestaurants={setFavRestaurants}
                          />
                        )}
                      </Stack.Screen>
                      {/* <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen> */}
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Yummiests"
                  options={{
                    tabBarLabel: "Yummiests",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="favorite" size={26} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator
                    // screenOptions={{
                    //   headerTransparent: true,
                    //   // headerShown: true,
                    // }}
                    >
                      <Stack.Screen
                        name="Yummiests"
                        options={{
                          title: "My Yummiests",
                          tabBarLabel: "My Yummiests",
                          headerStyle: {
                            backgroundColor: purpleFltr,
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        {(props) => (
                          <YummiestsScreen
                            {...props}
                            isLoading={isLoading}
                            setIsLoading={isLoading}
                            favRestaurants={favRestaurants}
                            setFavRestaurants={setFavRestaurants}
                            setLimit={setLimit}
                            limit={limit}
                            type={type}
                            color={color}
                            handleColors={handleColors}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  drawerGrey: {
    backgroundColor: drawerGrey,
  },
  purpleFltr: {
    backgroundColor: purpleFltr,
  },
  lightGrey: { backgroundColor: lightGrey },
  splash: {
    flex: 1,
  },
});
