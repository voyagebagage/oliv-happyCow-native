// import colorExp from "../containers/RestaurantScreen";
// export const resColor = colorExp;
export let type = "";
export let color = "";
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\\\

export const handleColors = (type) => {
  // console.log(type);
  // let color = "";
  if (type === "veg-options") {
    return (color = "tomato");
  } else if (type === "vegan") {
    return (color = "green");
  } else if (type === "vegetarian") {
    return (color = "purple");
  } else if (type === "Veg Store") {
    return (color = "navy");
  } else if (type === "Ice Cream") {
    return (color = "yellow");
  } else if (type === "Other") {
    return (color = "linen");
  } else if (type === "Health Store") {
    return (color = "white");
  } else if (type === "Organization") {
    return (color = "tan");
  } else if (type === "Professional") {
    return (color = "turquoise");
  } else if (type === "Bakery") {
    return (color = "wheat");
  } else {
    return (color = "blue");
  }
};
