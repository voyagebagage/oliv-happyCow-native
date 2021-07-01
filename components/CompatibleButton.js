import React from "react";
import { Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";

const CompatibleButton = ({
  setToggleFilter,
  type,
  buttonName,
  styleText,
  styleButton,
}) => {
  // console.log(type);
  return (
    <>
      {Platform.OS === "ios" ? (
        <TouchableOpacity
          style={styleButton || null}
          onPress={() => {
            setToggleFilter(type);
          }}
        >
          <Text style={styleText || null}>{buttonName}</Text>
        </TouchableOpacity>
      ) : (
        <RNGTouchableOpacity
          style={styleButton}
          onPress={() => {
            setToggleFilter(type);
          }}
        >
          <Text style={styleText}>{buttonName}</Text>
        </RNGTouchableOpacity>
      )}
    </>
  );
};
export default CompatibleButton;
