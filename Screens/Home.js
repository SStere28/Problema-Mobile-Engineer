import React, { useState, useEffect   } from "react";
import { Text, View, TouchableOpacity, Image, FlatList, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";

const  Home = (props) =>  {

  const [spot, setSpot] = useState([]);
  const [spotFilter, setSpotFilter] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
  if(props.navigation.getParam("country") && props.navigation.getParam("wind")){
    searchFilter(props.navigation.getParam("country"), props.navigation.getParam("wind"));
     }
else {
  getSpotUsingGet();
  getFavouriteUsingGet();
}

if(props.navigation.getParam("favourite")){
  getFavouriteUsingGet();
} 
    return ()=>{}
  }, [props])

 const getSpotUsingGet =()=>  {
     fetch('https://624826c94bd12c92f4080a60.mockapi.io/spot', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson)=>{       
      setSpot(responseJson);
      setSpotFilter(responseJson);
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
  
  const deleteFavourite =(id)=> {
    fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        if(props.navigation.getParam("country")){
          searchFilter(props.navigation.getParam("country"), props.navigation.getParam("wind"));
          getFavouriteUsingGet(); }
      else {
        getFavouriteUsingGet(); }
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
        if(props.navigation.getParam("country")){
          searchFilter(props.navigation.getParam("country"), props.navigation.getParam("wind"));
          getFavouriteUsingGet();}
      else {
        getFavouriteUsingGet(); }
      })
    })
  }

 const searchFilter =(country, wind)=>{
   if (country){
     const newData = spot.filter((item)=>{
       if(parseFloat(item.probability) > parseFloat(wind)){
       const itemData = item.country ? item.country.toUpperCase()
       : ''.toUpperCase();
       const textData=country.toUpperCase();
       return itemData.indexOf(textData)>-1}
     });
     setSpotFilter(newData);
   }else{
    setSpotFilter(spot);
   }
 }

const ItemView = ({item}) => {
return (
<View  style={{flexDirection: "row",} } key={item.id}>
    <TouchableOpacity  style={styles.container} onPress={() => props.navigation.navigate("Details", {spotItem: item.id } )} >
    <Text style={styles.name }>{" "+item.name}</Text>
    <Text style={styles.country }>{" "+item.country}</Text>
    </TouchableOpacity>
  {(() => {
               if(favourites.findIndex(e => e.spot == item.id)>-1) {
                return (
                  <TouchableOpacity style={styles.containerImage}  onPress={() => deleteFavourite(favourites[favourites.findIndex(e => e.spot == item.id)].id)} >
                <Image  source={require('../assets/assetsAndroid/star-on/hdpi/star-on.png')} />
                </TouchableOpacity>
                )}
                else { 
                  return (
                    <TouchableOpacity style={styles.containerImage}  onPress={() => addFavourite(item.id)} >    
                <Image  source={require('../assets/assetsAndroid/star-off/hdpi/star-off.png')} />
                </TouchableOpacity>
                  )}
              })()}   
  </View> 
)
}
  return (
<FlatList 
data={spotFilter}
keyExtractor={(item, index)=> index.toString()}
renderItem={ItemView }
/>
); 
}

const HeaderButtonComponent = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={25}
    color="#FFF"
    {...props}
  />
);

var styles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginTop: 20,
    marginLeft:15
  },
  containerImage: {
    flex: 0.12,
    marginTop: 10
  },
  name: {
    fontSize: 12,
    textAlign: 'left',
    padding: 1,
  },
  country: {
    fontSize: 10,
    textAlign: 'left',
    padding: 1,
  },
});
  
Home.navigationOptions = (navData) => {
  return {
    headerTitle: "KitesurfingApp",
    headerRight: () => (
          
               <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Back"
          iconName="filter-sharp"
          onPress={() => navData.navigation.navigate("FiltersScreen")}
        />
      </HeaderButtons>
         
    ),
  };
};
  
export default Home;