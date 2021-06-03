import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import React from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";

const FlatListContent = ({ data, navigation, handleColors }) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.placeId)}
          // ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => {
            // type = item.type;
            // console.log("TYPE----------", type);
            return (
              <>
                <TouchableOpacity
                  style={styles.flatList}
                  onPress={() =>
                    navigation.navigate("Restaurant", {
                      id: item.placeId,
                      name: item.name,
                      description: item.description,
                      rating: item.rating,
                      pictures: item.pictures,
                      color: handleColors(item.type),
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
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.placeId)}
          // ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => {
            return (
              <>
                <RNGTouchableOpacity
                  style={styles.flatList}
                  onPress={() =>
                    navigation.navigate("Restaurant", {
                      id: item.placeId,
                      name: item.name,
                      description: item.description,
                      rating: item.rating,
                      pictures: item.pictures,
                      color: handleColors(item.type),
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
                </RNGTouchableOpacity>
              </>
            );
          }}
        />
      )}
    </>
  );
};
export default FlatListContent;

const styles = StyleSheet.create({
  //<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
});
