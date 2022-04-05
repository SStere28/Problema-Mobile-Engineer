import React, { useState, useEffect } from "react";
import { Text, View,ScrollView, TextInput, Button, TouchableOpacity, Image } from "react-native";

  
function Home  (props)  {

  const [spot, setSpot] = useState([]);
  const [favourites, setFavourites] = useState([]);


  useEffect(() => {
    getDataUsingGet();
  }, [])




 function getDataUsingGet ()  {
    //GET request
     fetch('https://624826c94bd12c92f4080a60.mockapi.io/spot', {
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

  function getCountries(){
    let country=[];
       country = spot.map(function(item){
             return item.country;
        });
 
        return country;
        
  }

  function filterSpots(spoturi){
    if(props.navigation.getParam("country")!=null && props.navigation.getParam("wind")!=null){
      
        if(spoturi.country == props.navigation.getParam("country") && parseInt(spoturi.probability)>parseInt(props.navigation.getParam("wind"))){
        return spoturi;}
     
    }else return spoturi;
    console.log(props.navigation.getParam("country")+" "+ props.navigation.getParam("wind"));
  }


    

  return (
<ScrollView>
     { 
     spot.map(function(item){
     return (
          <View  style={{
            flexDirection: "row",} } key={item.id}>
            <TouchableOpacity  style={{ padding: 10, flex: 1}} onPress={() => props.navigation.navigate("Details", {spotItem: item.id } )} >
            <Text >{" "+item.name}</Text>
            <Text >{" "+item.country}</Text>
            </TouchableOpacity>

          {(() => {
                       if(favourites.findIndex(e => e.spot == item.id)>-1) {
                        return (
                          <TouchableOpacity   onPress={() => deleteFavourite(favourites[favourites.findIndex(e => e.spot == item.id)].id)} >
                        <Image style={{ padding: 5, flex: 0.1}} source={require('../assets/assetsAndroid/star-on/hdpi/star-on.png')} />
                        </TouchableOpacity>
                        )}
                        else { 
                          return (
                            <TouchableOpacity   onPress={() => addFavourite(item.id)} >    
                        <Image style={{ padding: 5, flex: 0.1}} source={require('../assets/assetsAndroid/star-off/hdpi/star-off.png')} />
                        </TouchableOpacity>
                          )}
                      })()}
          </View>            
     )    
})}
</ScrollView>
  );

  
}
  
Home.navigationOptions = (navData) => {
  return {
    headerTitle: "KitesurfingApps",
    headerRight: () => (
      
          <TouchableOpacity   onPress={() => navData.navigation.navigate("FiltersScreen")} >
          <Image style={{ padding: 5, flex: 0.5}} source={require('../assets/assetsAndroid/filter/hdpi/Filter.png')} />
          </TouchableOpacity>
    ),
  };
};

  
export default Home;