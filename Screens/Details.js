import React, { useState, useEffect } from "react";
import { Text, View,ScrollView, TextInput, Button, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";
import MapView,{Marker} from 'react-native-maps';
function Details (navData) {

  const [spot, setSpot] = useState([]);
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    getDataUsingGet();
  }, [])
  
 function getDataUsingGet ()  {
    //GET request
     fetch(`https://624826c94bd12c92f4080a60.mockapi.io/spot/${navData.navigation.getParam("spotItem")}`, {
      method: 'GET',
      //Request Type
    })
    .then(function(response) {
      // response.json() returns a promise, use the same .then syntax to work with the results
      response.json().then(function(users){
        setSpot(users);
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
      });
    }).catch(err => console.error(err)); 
  };

  const HeaderButtonComponent = (props) => (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={10}
      color="#FFF"
      {...props}
    />
  );



  function deleteFavourite(id) {
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getDataUsingGet()
      })
    })
  }

  function addFavourite(spot) {
    let item={spot};
    console.log(spot);
    console.warn("item",item)
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        getDataUsingGet()
      })
    })
  }

  Details.navigationOptions = (navData) => {
    return {
      headerTitle:  spot.name,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                    {(() => {
                       if(favourites.findIndex(e => e.spot == spot.id)>-1) {
                         console.log();
                       
                        return (
                         
                          <TouchableOpacity   onPress={() => deleteFavourite(favourites[favourites.findIndex(e => e.spot == spot.id)].id)} >
                        <Image style={{ padding: 5, flex: 0.1}} source={require('../assets/assetsAndroid/star-on/hdpi/star-on.png')} />
                        </TouchableOpacity>
                        )}
                        else {
                          return (
                           
                            <TouchableOpacity   onPress={() => addFavourite(spot.id)}>
                        <Image style={{ padding: 5, flex: 0.1}} source={require('../assets/assetsAndroid/star-off/hdpi/star-off.png')} />
                        </TouchableOpacity>
                          )}
                      })()}
         
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
     <MapView
        style={{ padding: 150}}
        initialRegion={{
          latitude: parseFloat(spot.lat),
          longitude:  parseFloat(spot.long),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
              <Marker
          coordinate={{latitude: parseFloat(spot.lat), longitude: parseFloat(spot.long)}}
          title="Maker"
         
        />
        </MapView>
   </View> 
    

  
  );

  
}

export default Details;