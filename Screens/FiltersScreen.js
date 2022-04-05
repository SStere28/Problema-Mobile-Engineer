import React, {useState, useEffect} from "react";
import { Text, View, TextInput, Button } from "react-native";

import  SelectDropdown from 'react-native-select-dropdown'

const FiltersScreen = (param) => {

const [spot, setSpot] = useState([]);
const [ wind, setWind] = useState('');
const [ country, setCountry] = useState('');

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
  
};

function getCountries(){
  let country=[];
     country = spot.map(function(item){
           return item.country;
      });

      return country;
      
}

  return (
    <View style={{ flex: 1, alignItems: "center",
                   justifyContent: "center" }}>
      <Text style={{ color: "#4169E1", fontSize: 40 }}>
        Country
      </Text>
      <SelectDropdown
	data={getCountries()}
	onSelect={(selectedItem, index) => {
    setCountry(selectedItem);
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
/>
       <Text style={{ color: "#4169E1", fontSize: 40 }}>
        Wind Probability
      </Text>
      <TextInput
        placeholder="Set wind probability"
        keyboardType='numeric'
    onChangeText={text => setWind(text)}
      />
          <Button
          
        title="Filter"
        color="#4169E1"
        onPress={() => param.navigation.navigate("Home", {country: country, wind: wind })}
        
      />
      
    </View>
     
  );
};
  
export default FiltersScreen;