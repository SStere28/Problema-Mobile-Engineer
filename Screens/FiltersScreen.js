import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
  
const FiltersScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center",
                   justifyContent: "center" }}>
      <Text style={{ color: "#4169E1", fontSize: 40 }}>
        Not yet!
      </Text>
      <Ionicons name="ios-person-circle-outline" 
                size={80} color="#4169E1" />
    </View>
  );
};
  
export default FiltersScreen;