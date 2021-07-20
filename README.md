# happyCow React Native Replica
by [Olivier Frugier](https://github.com/voyagebagage) 

### => One word about Happy Cow's [app](https://www.happycow.net/mobile):                                                                                  
it is app that can find for you all the vegan and vegetarian solutions( restaurants) around you, and actually any restaurants.                             


This is a project I realised on my own during my Bootcamp and keep on making it because where I am we need an app like that one where I would implement post section for "daily dish" and a system of delivery which is already organise by a friend. I have done the back end too with node.js

[<img alt="Follow Voyage Bagage" src="https://i.imgur.com/GJgES2p.png" height="35px">](https://github.com/voyagebagage)
[<img alt="App Repository" src="https://imgur.com/XyaL8Dg.png" height="35px">](https://github.com/voyagebagage/oliv-happyCow-native)
[<img alt="Server Repository" src="https://imgur.com/rod7TG4.png" height="35px">](https://github.com/voyagebagage/olivDev--happy-cow--back)






<img src="https://user-images.githubusercontent.com/81431557/124770620-ad2c0900-df64-11eb-91a2-1ba72144ac66.png" align="right" min-height="40%" width="30%"/>

## So far I have implemented:

#### - A [Home Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/HomeScreen.js) including:
   * The map in the background with a color code for different type of Restaurant + call outs
   * The map has a radius max, made with [_**geolib**_](https://www.npmjs.com/package/geolib), that display results within
   * a search bar (which liks to my server/back end)
   * I am using the [_**reanimated bottom sheet**_](https://github.com/osdnk/react-native-reanimated-bottom-sheet) to display some filters & results 
   * You can cumulate search bar results and filters together like in the real app
   * The bottom sheet is on infite loading and display a sum up of each restaurant
   * a Tab Bar including the Home screen and the Yummiests screen for favorites

#### - A [Restaurant Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/RestaurantScreen.js) including:
   * Full information of the restaurant 
   * color coded background for each type of restaurant
   * Favorite buttons: add, remove, clear

#### - A [Yummiests Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/Yummiests.js) including:
   * All the Favorites added (Yummies) with color coded type restaurant






 ## What needs to be added:
   - [ ] a Filter screen to groupe all the filters in one page with a radius SLIDER
   - [ ] make pretty the Restaurant screen
   - [ ] Possibility to clear or remove favorite from the Favorite screen
   - [ ] make the call outs like in the real app
   - [ ] a post section in the Tab bar to see what is ready to be delivered that
     will navigate to the delivery section with price and What's App button
   - [ ] A Login/Sign up screen for Restaurants only
