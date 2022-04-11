import React, {useState, useEffect, useRef } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import  SelectDropdown from 'react-native-select-dropdown'

const FiltersScreen = (param) => {

const [spot, setSpot] = useState([]);
const [ wind, setWind] = useState('');
const [ country, setCountry] = useState('');


useEffect(() => {
 if( param.navigation.getParam("country")){
   console.log("Merge "+param.navigation.getParam("country"));
 }
 const retriveData = async () => {
  await getSpotUsingGet();
}
retriveData();
}, [])

const getSpotUsingGet =async()=>  {
  try {
    const response = await fetch(`https://624826c94bd12c92f4080a60.mockapi.io/spot`, {
      method: 'GET',
    });
    const json = await response.json();
    setSpot(json);
  } catch (error) {
    console.error(error);
  }
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
           <TouchableOpacity style={styles.filterBtn} onPress={() => param.navigation.navigate("Home", {country: country, wind: wind }) }>
            <Text >Filter</Text>
          </TouchableOpacity>
    </View>
   
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  wind: {
    marginTop: 30,
    marginLeft: 15,
    fontSize: 20,
    textAlign: 'center',
    padding: 1,
  },
  country: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    padding: 1,
  },
  selectDropdown: {
    marginTop: 30,
    fontSize: 23,
    textAlign: 'center',
  },
  TextImput: {
    height: 5,
   flex: 0.1,
    padding: 5,
    fontSize: 20
  },
  filterBtn: {
    width: "40%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4169E1",
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