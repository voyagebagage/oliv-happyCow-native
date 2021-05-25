import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
