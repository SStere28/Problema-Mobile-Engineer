import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
  
import HomeScreen from "./Screens/Home";
import DetailsScreen from "./Screens/Details";
import FiltersScreen from "./Screens/FiltersScreen";
import Login from "./Screens/Login"
import Account from "./Screens/Account";
  
const AppNavigator = createStackNavigator(
  {  Login: Login,
    Home: HomeScreen,
    Account: Account, 
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
    initialRouteName: "Login",
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