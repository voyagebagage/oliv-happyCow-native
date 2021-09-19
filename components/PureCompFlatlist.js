import React, { PureComponent } from "react";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import colors from ".././assets/colors";
const { drawerGrey } = colors;
import {
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  Image,
  View,
  // ActivityIndicator,
} from "react-native";
// import { FixedSizeList as List } from 'react-window';
import { Rating } from "react-native-ratings";
import { handleColors } from "./lib";

class PureCompFlatlist extends React.PureComponent {
  constructor() {
    super();
    // this.state = { navigationN: {} };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   if (nextProps !== this.props) {
  //     return true;
  //   } else {
  //     return false;
  //   }}
  // if (nextProps.navigation.navigate === this.props.navigation.navigate) {
  //   console.log("true");

  //   return true;
  // } else {
  //   console.log("false");

  //   return false;
  // }

  render() {
    // console.log("render");

    const { item, handleColors, navigation } = this.props;
    // console.log(this.props);

    return (
      <TouchableOpacity
        style={styles.flatList}
        onPress={
          () =>
            navigation.navigate("Restaurant", {
              id: item.placeId,
              name: item.name,
              description: item.description,
              rating: item.rating,
              thumbnail: item.thumbnail,
              pics: item.pictures,
              type: item.type,
              color: handleColors(item.type),
              address: item.address,
              fb: item.facebook,
              website: item.link,
              phone: item.phone,
            })
          // this.setState(
          //   {
          //   navigationN: navigation.navigate("Restaurant", {
          //     id: item.placeId,
          //     name: item.name,
          //     description: item.description,
          //     rating: item.rating,
          //     thumbnail: item.thumbnail,
          //     color: handleColors(item.type),
          //   }),
          // })
        }
      >
        <Image style={styles.flatListPic} source={{ uri: item.thumbnail }} />
        <View style={styles.flatListContent}>
          <View style={styles.flatListNameType}>
            <View style={styles.flatListName}>
              <Text style={styles.flatListText}>{item.name}</Text>
              <Rating
                type="star"
                // imageRating="star"
                ratingColor="gold"
                imageSize={windowWidth * 0.045}
                tintColor={drawerGrey}
                ratingTextColor="gold"
                ratingBackgroundColor="rgba(255,255,255,0.3)"
                startingValue={item.rating}
                // onFinishRating={ratingCompleted}
                style={{
                  marginTop: windowHeight * 0.01,
                }}
              />
            </View>

            <View
              style={[
                styles.flatListType,
                {
                  backgroundColor: handleColors(item.type),
                },
              ]}
            >
              {/* <Text style={styles.flatListText}>{item.type}</Text> */}
            </View>
          </View>
          <View style={styles.descriptionV}>
            <Text style={styles.flatListText} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PureCompFlatlist;

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: windowHeight * 0.15,
  },
  //<<<<<<<<<<<<<<<<<<<<<<<<<<----|FLATLIST|---->>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  flatList: {
    marginTop: windowHeight * 0.014,
    // height: windowHeight * 0.125,
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
    // flexDirection: "row",
  },
  flatListName: {
    // borderWidth: 5,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flatListNameType: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 2,
  },
  // flatListName: { borderWidth: 3 },
  flatListType: {
    flexDirection: "column",
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 50,
    width: windowWidth * 0.065,
    height: windowHeight * 0.03,
    // color: handleColors(item.type),
    // height: windowHeight * 0.02,
  },
  descriptionV: {},
  flatListText: {
    color: "lightgray",
    // textAlign: "left",
  },
});
