import React, { useState, useEffect,     } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker} from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import {
  Item,
  HeaderButton,
  HeaderButtons,
} from "react-navigation-header-buttons";


const  Details = (navData) => {

  const [spot, setSpot] = useState({});
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const retriveData = async () => {
      await getSpotUsingGet();
      await getFavouriteUsingGet();
    Details.navigationOptions();
    }
    retriveData();
    return () => {
      setSpot({});
      setFavourites([]);
    }
  }, [])
  
  const getSpotUsingGet =async()=>  {
    try {
      const response = await fetch(`https://624826c94bd12c92f4080a60.mockapi.io/spot/${navData.navigation.getParam("spotItem")}`, {
        method: 'GET',
      });
      const json = await response.json();
      setSpot(json);
    } catch (error) {
      console.error(error);
    }
 };

 const getFavouriteUsingGet = async ()=>{
  try {
    const response = await fetch('https://624826c94bd12c92f4080a60.mockapi.io/favourites', {
      method: 'GET',
    });
    const data = await response.json();
    setFavourites([...data]);
  } catch (error) {
    console.error(error);
  }
 }

  const  deleteFavourite =async (id)=> {
    try {
      await 
      fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/${id}`, {
        method: 'DELETE'
      });
      setFavourites(favourites.filter(favorite => favorite.id != id));
    } catch (error) {
      console.error(error);
    }
  }

  const addFavourite = async (spot) => {
    await fetch(`https://624826c94bd12c92f4080a60.mockapi.io/favourites/`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({spot})
    });
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
      headerTitle: spot.name,
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
                          return (
                            <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
                            <Item
                              title="star-o"
                              iconName="star-outline"
                              onPress={() => addFavourite(spot.id)}
                            />
                          </HeaderButtons>
                          )
                      })()
      ),
      headerLeft: () => ( 
      <HeaderButtons HeaderButtonComponent={HeaderButtonComponent}>
        <Item
          title="Back"
          iconName="arrow-back"
          onPress={() => navData.navigation.navigate("Home", {favourite: false})}
        />
      </HeaderButtons> 
      ),
    }
  };

return (
     <View style={styles.container}  >
     <Text style={styles.Text}> Country</Text>
     <Text style={styles.TextImput}> { spot.country}</Text>
     <Text style={styles.Text}> Latitude</Text>
     <Text style={styles.TextImput}> { spot.lat}</Text>
     <Text style={styles.Text}> Longitude</Text>
     <Text style={styles.TextImput}> { spot.long}</Text>
     <Text style={styles.Text}> Wind Probability</Text>
     <Text style={styles.TextImput}> { spot.probability}</Text>
     <Text style={styles.Text}> When to go</Text>
     <Text style={styles.TextImput}> { spot.month}</Text>
     {(() => { if(spot.lat!=undefined){
        return (
   <MapView
   style={styles.map}
    initialRegion={{
      latitude: Number.parseFloat(spot.lat),
      longitude: Number.parseFloat(spot.long),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >   
</MapView> )}
})()} 
   </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "baseline",
  },
  Text: { 
    marginTop: 10,
    marginLeft:15,
    fontSize: 15
  },
  TextImput: {
   marginLeft:15,
    padding: 5,
    fontSize: 12
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/2,
  },
});

export default Details;