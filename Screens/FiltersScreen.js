import React, {useState, useEffect, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import  SelectDropdown from 'react-native-select-dropdown'

const FiltersScreen = (param) => {

const [spot, setSpot] = useState([]);
const [ wind, setWind] = useState('');
const [ country, setCountry] = useState('');
const childRef = useRef()
useEffect(() => {
 if( param.navigation.getParam("country")){
   console.log("Merge "+param.navigation.getParam("country"));
 }
  getDataUsingGet();
}, [])

const getDataUsingGet = ()=>  {
   fetch('https://624826c94bd12c92f4080a60.mockapi.io/spot', {
    method: 'GET',
  })
  .then(function(response) {
    response.json().then(function(users){
      setSpot(users);
    });
  }).catch(err => console.error(err)); 
};

const getCountries = ()=> {
  let country=[];
     country = spot.map(function(item){
           return item.country;
      });
      return country;  
}

  return (
    <View style={styles.container}>
      <Text style={styles.country}>
        Country
      </Text>
      <SelectDropdown
  style={styles.selectDropdown}
	data={getCountries()}
  defaultValue={param.navigation.getParam("country")}
	onSelect={(selectedItem, index) => {setCountry(selectedItem);}}
	buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
	rowTextForSelection={(item, index) => {return item}}
/>
       <Text style={styles.wind}>
        Wind Probability
      </Text>
      <TextInput
        placeholder="Set wind probability"
        keyboardType='numeric'
         onChangeText={text => setWind(text)}
      />
                   <View style={styles.containerButton}  onPress={() => param.navigation.navigate("Home", {country: country, wind: wind })} >    
                    <Text style={styles.title} onPress={() => param.navigation.navigate("Home", {country: country, wind: wind })}> Filter</Text>
                </View>

    </View>
     
  );

  


};

var styles = StyleSheet.create({

  container: {
    flex:1,
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
  wind: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 12,
    textAlign: 'left',
    padding: 1,
  },
  country: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 12,
    textAlign: 'left',
    padding: 1,
  },
  selectDropdown: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 23,
    textAlign: 'right',
    padding: 1,
  },
  button: {
    marginTop: 30,
    marginLeft: 15,
    marginTop: 30,
    fontSize: 23,
    padding: 24,
    
  },
  containerButton: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

  
export default FiltersScreen;