import React, { useState } from "react";
import { Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";

const CompatibleButtonList = ({
  setToggleFilter,
  toggleFilter,
  styleText,
  styleButton,
  styleIsActive,
}) => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([
    { type: "ALL", isActive: true },
    { type: "vegan", isActive: true },
    { type: "vegetarian", isActive: true },
    { type: "veg-options", isActive: true },
    { type: "health-store", isActive: true },
    { type: "ice-cream", isActive: true },
    { type: "veg-store", isActive: true },
    { type: "bakery", isActive: true },
    { type: "juice-bar", isActive: true },
    { type: "B&B", isActive: true },
    { type: "professional", isActive: true },
    { type: "catering", isActive: true },
    { type: "other", isActive: true },
  ]);

  const handleCheck = (index) => {
    let toggle = [...list];
    setCount(count + 1);
    console.log("==========================///////", count, "\\\\\\=========");
    if (count < 1) toggle.forEach((elem) => (elem.isActive = false));
    toggle[index].isActive = !toggle[index].isActive;
    setList(toggle);

    if (toggle[index].isActive) {
      setToggleFilter(toggle[index].type);
      if (count > 0) setToggleFilter(`${toggleFilter} ${toggle[index].type}`);
    }
    if (!toggle[index].isActive) {
      let arrToggleFilter = toggleFilter.split(" ");
      arrToggleFilter.splice(index - 1, 1);
      let stringyfyArrToggleFilter = arrToggleFilter.join(" ");
      setToggleFilter(stringyfyArrToggleFilter);
    }

    if (toggle[index].type === "ALL") {
      toggle.forEach((elem) => (elem.isActive = true));
      setList(toggle);
      setCount(0);
      setToggleFilter("");
      console.log(" if", toggleFilter);
    }
  };

  return (
    <>
      {list.map((type, index) => {
        return Platform.OS === "ios" ? (
          <TouchableOpacity
            key={index}
            style={type.isActive ? [styleButton, styleIsActive] : styleButton}
            onPress={() => handleCheck(index)}
          >
            <Text
              style={type.isActive ? [styleText, styleIsActive] : styleText}
            >
              {type.type}
            </Text>
          </TouchableOpacity>
        ) : (
          <RNGTouchableOpacity
            key={index}
            style={styleButton}
            onPress={() => {
              setToggleFilter(type);
            }}
          >
            <Text style={styleText}>{buttonName}</Text>
          </RNGTouchableOpacity>
        );
      })}
    </>
  );
};
export default CompatibleButtonList;
