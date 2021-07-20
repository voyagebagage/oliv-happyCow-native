# happyCow-native-Replica

=> One Word about Happy Cow's app: it is app that can find for you all the vegan and vegetarian solutions( restaurants) around you, and actually any restaurants <=

This is a project I realised on my own during my Bootcamp and keep on making it because where I am we need an app like that one where I would implement post section for "daily dish" and a system of delivery which is already organise by a friend. I have done the back end too with node.js => here

So far I have implemented:

- A Home Screen including:
- the map in the background with a color code for different type of Restaurant + call outs
- the map has a radius max, made with geolib, that display results within
                         - a search bar (which liks to my server/back end)
                         - I am using the reanimated bottom sheet to display some filters & results 
                         - You can cumulate search bar results and filters together like in the real app
                         - The bottom sheet is on infite loading and display a sum up of each restaurant
                         - a Tab Bar including the Home screen and the Yummiests screen for favorites

- A Restaurant Screen including:
                         - Full information of the restaurant 
                         - color coded background for each type of restaurant
                         - Favorite buttons: add, remove, clear

- A Yummiests Screen including:
                         - All the Favorites added (Yummies) with color coded type restaurant

What needs to be added:
                         - a Filter screen to groupe all the filters in one page with a radius SLIDER
                         - make pretty the Restaurant screen
                         - Possibility to clear or remove favorite from the Favorite screen
                         - make the call outs like in the real app
                         - a post section in the Tab bar to see what is ready to be delivered that
                           will navigate to the delivery section with price and What's App button
                         - A Login/Sign up screen for Restaurants only

![Simulator Screen Shot - iPhone 12 Pro Max - 2021-07-07 at 20 46 01](https://user-images.githubusercontent.com/81431557/124770620-ad2c0900-df64-11eb-91a2-1ba72144ac66.png)
