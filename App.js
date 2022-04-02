import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
  
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
import FiltersScreen from "./Screens/FiltersScreen";
  
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    FiltersScreen: FiltersScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#4169E1",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#FFF",
      },
      headerTintColor: "#FFF",
    },
  },
  {
    initialRouteName: "Home",
  }
);
  
const Navigator = createAppContainer(AppNavigator);
  
export default function App() {
  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
}