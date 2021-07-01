import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  View,
  // ActivityIndicator,
} from "react-native";
import { TouchableOpacity as RNGTouchableOpacity } from "react-native-gesture-handler";

const FlatListContent = ({
  dataFlat,
  navigation,
  handleColors,
  setLimit,
  limit,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = () => {
    console.log(limit);
    setIsLoadingMore(true);
    if (limit >= 65) setIsLoadingMore(false);
    if (isLoadingMore) {
      setLimit(limit + 20);
      setIsLoadingMore(false);
    }
  };
  // const renderFooter = () => {
  //   return isLoadingMore ? (
  //     <View style={{ marginTop: 0, height: 50 }}>
  //       <ActivityIndicator
  //         size="large"
  //         color="green"
  //         style={styles.activityIndicator}
  //       />
  //     </View>
  //   ) : null;
  // };
  return (
    <>
      {Platform.OS === "ios" ? (
        <FlatList
          data={dataFlat}
          keyExtractor={(item) => String(item.placeId)}
          renderItem={({ item }) => {
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
                      thumbnail: item.thumbnail,
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
          onEndReached={handleLoadMore}
          // ListFooterComponent={renderFooter}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.placeId)}
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
                      thumbnail: item.thumbnail,
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
          // ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
        />
      )}
    </>
  );
};
export default FlatListContent;

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: windowHeight * 0.15,
  },
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