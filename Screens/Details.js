import React, { useState, useEffect,     } from "react";
import { Text, View, Button, TouchableOpacity, Image, StyleSheet } from "react-native";
import MapView,{Marker} from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";

const  Details = (navData) => {

  const [spot, setSpot] = useState([]);
  const [favourites, setFavourites] = useState([]);
  let favourite=false;
  
  useEffect(() => {
    getSpotUsingGet();
    getFavouriteUsingGet();
    return ()=>{}
  }, [])
  

  const getSpotUsingGet =()=>  {
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/spot/${navData.navigation.getParam("spotItem")}`, {
     method: 'GET',
   })
   .then((response) => response.json())
   .then((responseJson)=>{       
     setSpot(responseJson);
   }).catch(err => console.error(err)); 
 };

 const getFavouriteUsingGet = ()=>{
   fetch('https://624826c94bd12c92f4080a60.mockapi.io/favourites', {
     method: 'GET',
   })
   .then(function(response) {
     response.json().then(function(users){
       setFavourites(users);
     });
   }).catch(err => console.error(err)); 
 }

  const  deleteFavourite =(id)=> {
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        getFavouriteUsingGet();
      })
    })

  }

  const addFavourite = (spot) => {
    let item={spot};
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        getFavouriteUsingGet();
      })
    })
  }
  const HeaderButtonComponent = (props) => (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={25}
      color="#FFF"
      {...props}
    />
  );

  Details.navigationOptions = (navData) => {
    return {
      headerTitle:  spot.name,
      headerRight: () => (
        
                    (() => {
                      if(favourites.findIndex(e => e.spot == spot.id)>-1) {
                        return (
                          <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                          <Item
                            title="star"
                            iconName="star"
                            onPress={() => deleteFavourite(favourites[favourites.findIndex(e => e.spot == spot.id)].id)}
                          />
                        </HeaderButtons>
                        )}
                        else {
                          return (
                            <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                            <Item
                              title="star-o"
                              iconName="star-outline"
                              onPress={() => addFavourite(spot.id)}
                            />
                          </HeaderButtons>
                          )}
                      })()
      ),
      headerLeft: () => ( 
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Back"
          iconName="arrow-back"
          onPress={() => navData.navigation.navigate("Home", {favourite: favourite})}
        />
      </HeaderButtons>

        
      ),
    }
  };

return (

     <View style={{ padding: 20}} >
     <Text > Country</Text>
     <Text > { spot.country}</Text>
     <Text > Latitude</Text>
     <Text > { spot.lat}</Text>
     <Text > Longitude</Text>
     <Text > { spot.long}</Text>
     <Text > Wind Probability</Text>
     <Text > { spot.probability}</Text>
     <Text > When to go</Text>
     <Text > { spot.month}</Text>

   </View> 
  
  );
}

export default Details;