import React, { useState } from "react";
import { Text, View,ScrollView, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";
  
const Home = (props) => {
   let x=0;
  const [spot, setSpot] = useState([]);
  const [favourites, setFavourites] = useState([]);

 const getDataUsingGet = () => {
    //GET request
     fetch('https://624826c94bd12c92f4080a60.mockapi.io/spot', {
      method: 'GET',
      //Request Type
    })
    .then(function(response) {
      // response.json() returns a promise, use the same .then syntax to work with the results
      response.json().then(function(users){
        setSpot(users);
        
        // users is now our actual variable parsed from the json, so we can use it
       users.forEach(function(user){
        console.log(user.id + " "+ user.name);
       });
      });
    }).catch(err => console.error(err)); 

    fetch('https://624826c94bd12c92f4080a60.mockapi.io/favourites', {
      method: 'GET',
      //Request Type
    })
    .then(function(response) {
      // response.json() returns a promise, use the same .then syntax to work with the results
      response.json().then(function(users){
        setFavourites(users);
        
        // users is now our actual variable parsed from the json, so we can use it
       users.forEach(function(user){
        console.log(user.id + " "+ user.name);
       });
      });
    }).catch(err => console.error(err)); 
  };
  

  return (


    

<ScrollView>
<TouchableOpacity
            style={{ alignItems: 'center',
            backgroundColor: '#f4511e',
            padding: 10,
            marginVertical: 10,}}
            onPress={getDataUsingGet}>
            <Text style={{ fontSize: 18,
    color: 'white',}}>
              Get Data Using GET
            </Text>
          </TouchableOpacity>

     { 
     spot.map(function(item){
     return (
          <View key={item.id}>
            <TouchableOpacity style={{ padding: 20}} onPress={() => props.navigation.navigate("Details", {spotItem: item} )} >
            <Text >{" "+item.name}</Text>
            <Text >{" "+item.country}</Text>
            {  
            favourites.map(function(favourite){
              if(favourite.spot==item.id)
              x=item.id;
             
            })  }
          {(() => {
                       if(x==item.id) {
                        x=0;
                        return (
                          <View key={item.id}>
                        <Text >Favourite</Text>
                        </View> 
                        )
                        
                        }
                        else {
                          return (
                            <View key={item.id}>
                          <Text >UnFavourite</Text>
                          </View> 
                          )
                        }
                      })()}
             
           
             
              
            </TouchableOpacity>
          </View>            
     )    
})}

</ScrollView>
 

  );
};
  
const HeaderButtonComponent = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color="#FFF"
    {...props}
  />
);
  
Home.navigationOptions = (navData) => {
  return {
    headerTitle: "KitesurfingApps",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Filters"
          iconName="ios-settings-outline"
          onPress={() => navData.navigation.navigate("FiltersScreen")}
        />
      </HeaderButtons>
    ),
  };
};

  
export default Home;