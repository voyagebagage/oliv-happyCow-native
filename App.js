import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";

import splasHappy from "./assets/splasHappy.png";
// import {  } from '@expo/vector-icons';
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import { StyleSheet, Image, ImageBackground } from "react-native";
// import Restaurant from "./containers/Restaurant";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

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
                }}
              >
                <Tab.Screen
                  name="Explore"
                  options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="search1" size={24} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitleStyle: {
                            fontWeight: "bold",
                            alignSelf: "center",
                            color: "white",
                          },
                          title: "HappyCow",
                          headerStyle: {
                            backgroundColor: "purple",
                          },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen name="Restaurant">
                        {(props) => <RestaurantScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Yammiests"
                  options={{
                    tabBarLabel: "Yammiests",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="favorite" size={26} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
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
  splash: {
    flex: 1,
  },
});