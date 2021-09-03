// import colorExp from "../containers/RestaurantScreen";
// export const resColor = colorExp;
export let type = "";
export let color = "";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\
// import colors from "../assets/colors";
// const { drawerGrey, greenFltr, purpleFltr, redFltr } = colors;

export const handleColors = (type) => {
  if (type === "filter") {
    return (color = "white");
  } else if (type === "veg-options") {
    return "tomato";
  } else if (type === "vegan") {
    return "green";
  } else if (type === "vegetarian") {
    return "purple";
  } else if (type === "veg-store") {
    return "navy";
  } else if (type === "ice-cream") {
    return "yellow";
  } else if (type === "other") {
    return "linen";
  } else if (type === "health-store") {
    return "white";
  } else if (type === "organization") {
    return "tan";
  } else if (type === "professional") {
    return "turquoise";
  } else if (type === "bakery") {
    return "wheat";
  } else {
    return "blue";
  }
};

export const arrList = [
  { type: "filter", isActive: true },
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
];
