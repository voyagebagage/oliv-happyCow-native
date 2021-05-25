import React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function SignUpScreen({ setToken }) {
  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
      </View>
    </View>
  );
}
