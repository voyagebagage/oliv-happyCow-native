import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./containers/HomeScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import PhotoScreen from "./containers/PhotoScreen";

import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import YummiestsScreen from "./containers/Yummiests";

import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import splasHappy from "./assets/splasHappy.png";
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
  // console.log(route)

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
                      //for all the screens - option for one
                      screenOptions={{}}
                    >
                      {/* peut mettre des options la */}
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerShown: false,
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
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Restaurant"
                        style={{}}
                        options={({ route }) => ({
                          headerTransparent: false,
                          title: " ",
                          // headerTitleStyle: {},
                          headerStyle: { backgroundColor: route.params.color },
                        })}
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
                      <Stack.Screen
                        name="Photos"
                        style={{}}
                        options={({ route }) => ({
                          headerTransparent: false,
                          title: " ",
                          // headerTitleStyle: {},
                          headerStyle: { backgroundColor: route.params.color },
                        })}
                      >
                        {(props) => (
                          <PhotoScreen
                            {...props}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            // favRestaurants={favRestaurants}
                            // setFavRestaurants={setFavRestaurants}
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
                            favRestaurants={favRestaurants}
                            setFavRestaurants={setFavRestaurants}
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
