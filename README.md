# happyCow React Native w/Expo Replica
by [Olivier Frugier](https://github.com/voyagebagage) 

### => One word about Happy Cow's [app](https://www.happycow.net/mobile): 
that app can find for you all the vegan and vegetarian solutions( restaurants) around you, and actually any restaurants.                             

--------------------------
This was *2 weeks project* I realised **on my own**
 during my Bootcamp, *being a beginner at React Native* and I will keep on making it because where I am living at, we need an app like that one where I would implement post section for "daily dish" and a system of delivery which is already organise by a friend. I have done the back end too with node.js

[<img alt="Follow Voyage Bagage" src="https://i.imgur.com/GJgES2p.png" height="35px">](https://github.com/voyagebagage)
[<img alt="App Repository" src="https://imgur.com/XyaL8Dg.png" height="35px">](https://github.com/voyagebagage/oliv-happyCow-native)
[<img alt="Server Repository" src="https://imgur.com/rod7TG4.png" height="35px">](https://github.com/voyagebagage/olivDev--happy-cow--back)

--------------------------
## Specification
![Screen Shot 2564-07-21 at 09 38 20](https://user-images.githubusercontent.com/81431557/126422999-c1639e5e-543f-4814-b68d-61e9d84ceac8.png)

Recommendations
- Don't make a "Plus Screen"
- Replace "Me Screen" by a Favorite Screen
- Create Back end if you want and have the time
- ⚠  Attention, make it responsive, and working on Iphone & Android

### Building Steps:
- Create the navigation in between screens ( with stack navigator and tab navigator)
- Build the following screens :
  - _**splash screen**_
  - _**Restaurant list**_ 
  - _**Restaurant Details**_
  - _**Map Screen**_ 
  - _**Favourite Screen**_
- Implement the add favourite with _**Async Storage**_ 
- Implement filters:
    - with buttons
    - with a Search bar
- Implement gallery in the Restaurant Screen 
- Build the following screens:
   - _**Login Screen**_
   - _**SignUp Screen**_
- Create Back end
--------------------------
## Very first Step, choosing in between the old design or the new one ...!?
- in the Beginning my choice would go for the new deign, as I downloaded the app, it is really beautiful, slick and works fine.
**the challenge** was that I had no idea how to find such a component, after looking at EXPO documentation I undestood that was after: 
 _"a drawer that could slide from the bottom"_
I didn't at first so I chosen the old design... In the mean time, I had to take the decision of importing my JSON directly in my front or create a backend for it...
- I wanted to do more a **Full Stack** project so I built a backend.
- I ended up finding my drawer called: [_**reanimated bottom sheet**_](https://github.com/osdnk/react-native-reanimated-bottom-sheet) and switch back to new design
--------------------------
## my Navigation:
![photo_2021-07-21_12-02-31](https://user-images.githubusercontent.com/81431557/126433631-55a9e349-79c8-43e6-9700-6d60c9a93953.jpg)
##### in React Native it can be tidious, mixing style and logic props if very confusing. I googled a lot for simple things speacilly for style syntax but my navigation is relatively simple 

my home screen is the sum up of 2 screens:
  - Restaurant List screen
  - Map screen
--------------------------
<img src="https://user-images.githubusercontent.com/81431557/124770620-ad2c0900-df64-11eb-91a2-1ba72144ac66.png" align="right" min-height="40%" width="32%"/>

### So far I have implemented:

#### -> _first of all, everything is responsive and works on tablets also_ <-

#### - A Splash Screen with a Activity indicator

#### - A [Home Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/HomeScreen.js) including:
   * The map in the background with a color code for different type of Restaurant + call outs
   * The map has a max ray, made with [_**geolib**_](https://www.npmjs.com/package/geolib), that display results within
   * A search bar (which links to my server/back end)
   * I am using the [_**reanimated bottom sheet**_](https://github.com/osdnk/react-native-reanimated-bottom-sheet) to display some filters & results 
   * You can cumulate search bar results and filters together like in the real app
   * The bottom sheet is on infite loading and display a sum up of each restaurant
   * A Tab Bar including the Home screen and the Yummiests screen for favorites
--------------------------
#### - A [Restaurant Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/RestaurantScreen.js) including:
   * Full information of the restaurant 
   * color coded background for each type of restaurant
   * Favorite buttons: add, remove, clear
--------------------------
#### - A [Yummiests Screen](https://github.com/voyagebagage/oliv-happyCow-native/blob/main/containers/Yummiests.js) including:
   * All the Favorites added (Yummies) with color coded type restaurant

--------------------------

 ### What needs to be added:
   - [ ] a Filter screen to groupe all the filters in one page with a radius SLIDER
   - [ ] make pretty the Restaurant screen
   - [ ] Possibility to clear or remove favorite from the Favorite screen
   - [ ] make the call outs like in the real app
   - [ ] a post section in the Tab bar to see what is ready to be delivered that
     will navigate to the delivery section with price and What's App button
   - [ ] A Login/Sign up screen for Restaurants only
--------------------------

## Biggest challenges, issues and sorted tasks by time comsumed 

  1. Filtering is definetly number one, when you have finally succeded to cumulate the search bar and the type button in your back. you understand that Postman simulation is not realistic and rig it you front won't be as simple as you imagined

  1 bis. **Memory Leak** that would occur whenever I am going back and forth in between the flatlist of my Home Screen to my Restaurant page... I have tried:
    - the latest way of unmounting component, with the abortController in Axios
    - transforming my components into class component to use _PureComponent_ and _shouldComponentUpdate()_
at this very moment it is still laggy but I didn't get the warning since I rewrite some code and put some function into a lib file.
_**However**_ I am quite confident in using the hook useIsFocused to fetch only the flatlist when I am on my Home Screen

2. **TouchableOpacity** is not compatible and other incompatibility due to the _**reanimated bottom sheet**_. I ended up creating more "compatible component" and more ternary because of it

3. Async Storage isn't hard to understand but it took me some time to understand how to save an array of object under the same key

4. The map wasn't so much time comsuming but pin colors are limited and the ray filtering is tricky, it's backward in the documentation
--------------------------

## Conclusion:

### In the end I will probably remove bottom sheet with the list of my restaurants since the call outs are very well done and the map is way enough to find what you are looking for. This will improve performance and simplify the user experience
