import React, { useState } from "react";
import { Text, View,ScrollView, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";
import MapView,{Marker} from 'react-native-maps';
const Details = (navData) => {



return (

     <View style={{ padding: 20}} >
     <Text > Country</Text>
     <Text > { navData.navigation.getParam("spotItem").country}</Text>
     <Text > Latitude</Text>
     <Text > { navData.navigation.getParam("spotItem").lat}</Text>
     <Text > Longitude</Text>
     <Text > { navData.navigation.getParam("spotItem").long}</Text>
     <Text > Wind Probability</Text>
     <Text > { navData.navigation.getParam("spotItem").probability}</Text>
     <Text > When to go</Text>
     <Text > { navData.navigation.getParam("spotItem").month}</Text>
     <MapView
        style={{ padding: 150}}
        initialRegion={{
          latitude:  parseFloat(navData.navigation.getParam("spotItem").lat),
          longitude:  parseFloat(navData.navigation.getParam("spotItem").long),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
              <Marker
          coordinate={{latitude: parseFloat(navData.navigation.getParam("spotItem").lat), longitude: parseFloat(navData.navigation.getParam("spotItem").long)}}
          title="Maker"
         
        />
        </MapView>
   </View> 
    
 
  );
};
const setUnsetFavorite = ()=> {

};

const HeaderButtonComponent = (navData) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color="#FFF"
    {...navData}
  />
);

  
Details.navigationOptions = (navData) => {
  return {
    headerTitle:  navData.navigation.getParam("spotItem").name,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Filters"
          iconName="ios-settings-outline"
          onPress={setUnsetFavorite}
        />
      </HeaderButtons>
    ),
  };
};
export default Details;