import React from "react";
import { Text, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  SelectDropdown from 'react-native-select-dropdown'

const FiltersScreen = (param) => {
 
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]

  return (
    <View style={{ flex: 1, alignItems: "center",
                   justifyContent: "center" }}>
      <Text style={{ color: "#4169E1", fontSize: 40 }}>
        Country
      </Text>
      <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
       <Text style={{ color: "#4169E1", fontSize: 40 }}>
        Wind Probability
      </Text>
      <TextInput
        placeholder="Set wind probability"
        keyboardType='numeric'
      />
     
    </View>
  );
};
  
export default FiltersScreen;