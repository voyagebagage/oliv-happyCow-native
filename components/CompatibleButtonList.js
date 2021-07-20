import React, { useState } from "react";
import { Text, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";
import { handleColors, arrList } from "../components/lib";

const CompatibleButtonList = ({
  setToggleFilter,
  toggleFilter,
  styleText,
  styleButton,
  styleIsActive,
}) => {
  const [count, setCount] = useState(0);
  const [list, setList] = useState(arrList);

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
            style={
              type.isActive && count < 1
                ? styleButton
                : type.isActive
                ? [styleButton, { backgroundColor: handleColors(type.type) }]
                : styleButton
            }
            onPress={() => handleCheck(index)}
          >
            <Text
              style={
                type.isActive && count < 1
                  ? [
                      styleText,
                      {
                        color: handleColors(type.type),
                      },
                    ]
                  : type.isActive
                  ? [
                      styleText,
                      {
                        backgroundColor: handleColors(type.type),
                        color:
                          handleColors(type.type) === "white" ||
                          handleColors(type.type) === "wheat" ||
                          handleColors(type.type) === "yellow"
                            ? "black"
                            : "white",
                      },
                    ]
                  : [
                      styleText,
                      {
                        color: handleColors(type.type),
                      },
                    ]
              }
            >
              {type.type}
            </Text>
          </TouchableOpacity>
        ) : (
          <RNGTouchableOpacity
            key={index}
            style={type.isActive ? [styleButton, styleIsActive] : styleButton}
            onPress={() => handleCheck(index)}
          >
            <Text
              style={
                type.isActive
                  ? [styleIsActive, { backgroundColor: color }]
                  : styleText
              }
            >
              {type.type}
            </Text>
          </RNGTouchableOpacity>
        );
      })}
    </>
  );
};
export default CompatibleButtonList;
